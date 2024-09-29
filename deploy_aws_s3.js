const { exec } = require('child_process');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const S3_BUCKET = 'hebgames.pages';
const S3_ROOT_FOLDER = 'Games';
const S3_SUB_FOLDER = 'WordSearch';
const BUILD_COMMAND = 'npm run build';
const BUILD_OUTPUT_DIR = 'dist';
const CLOUDFRONT_DISTRIBUTION_ID = 'E29DUID5IVGWQM';
const CLOUDFRONT_DOMAIN = 'd12n4cwg3u8b3y.cloudfront.net';

let S3_FOLDER;

const deploymentTimestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);

// Configure AWS SDK
AWS.config.update({ region: 'eu-central-1' });
const s3 = new AWS.S3();
const cloudfront = new AWS.CloudFront();

// Function to run build command
function runBuild() {
    return new Promise((resolve, reject) => {
        exec(BUILD_COMMAND, (error, stdout, stderr) => {
            if (error) {
                console.error(`Build error: ${error}`);
                return reject(error);
            }
            console.log(`Build output: ${stdout}`);
            resolve();
        });
    });
}

// Function to delete all files in the S3 folder
async function deleteExistingFiles() {
    console.log(`Deleting existing files in ${S3_BUCKET}/${S3_FOLDER}...`);

    const listParams = {
        Bucket: S3_BUCKET,
        Prefix: S3_FOLDER
    };

    let listedObjects;
    do {
        listedObjects = await s3.listObjectsV2(listParams).promise();

        if (listedObjects.Contents.length === 0) break;

        const deleteParams = {
            Bucket: S3_BUCKET,
            Delete: { Objects: [] }
        };

        listedObjects.Contents.forEach(({ Key }) => {
            deleteParams.Delete.Objects.push({ Key });
        });

        await s3.deleteObjects(deleteParams).promise();

        listParams.ContinuationToken = listedObjects.NextContinuationToken;
    } while (listedObjects.IsTruncated);

    console.log(`All files in ${S3_BUCKET}/${S3_FOLDER} have been deleted.`);
}

// Function to ensure index.html starts with <!DOCTYPE html>
function ensureDoctype(content, filePath) {
    if (filePath && path.basename(filePath).toLowerCase() === 'index.html') {
        const doctype = '<!DOCTYPE html>';
        if (!content.trim().toLowerCase().startsWith(doctype.toLowerCase())) {
            console.log(`Adding DOCTYPE to ${filePath}`);
            return doctype + '\n' + content;
        }
    }
    return content;
}

// Function to generate a content-based hash
function generateContentHash(content) {
    return crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
}

function processFileContent(content, filePath) {
    const fileExt = path.extname(filePath).toLowerCase();
    
    if (['.html', '.js', '.css'].includes(fileExt)) {
        console.log(`Processing file: ${filePath}`);
        let originalContent = content;
        
        // Replace relative paths with full CloudFront URLs
        content = content.replace(
            /(src|href)=["']((?!http:\/\/|https:\/\/)([^"']+\.(js|css|png|jpg|gif|svg)))["']/g, 
            (match, attr, url) => {
                // Remove leading slash if present
                url = url.replace(/^\//, '');
                // Remove 'dist/' from the beginning of the URL if present
                url = url.replace(/^dist\//, '');
                let newUrl = `https://${CLOUDFRONT_DOMAIN}/${S3_FOLDER}${url}?v=${deploymentTimestamp}`;
                console.log(`Updated URL: ${match} -> ${attr}="${newUrl}"`);
                return `${attr}="${newUrl}"`;
            }
        );
        
        // Add versioning to import statements in JavaScript files
        if (fileExt === '.js') {
            content = content.replace(
                /import\s+(?:(\{[^}]+\})|(\w+)|\*\s+as\s+(\w+))\s+from\s+['"](.+?)['"];?/g,
                (match, namedImports, defaultImport, namespaceImport, importPath) => {
                    if (!importPath.startsWith('http') && !importPath.includes('?')) {
                        // Remove leading './' if present
                        importPath = importPath.replace(/^\.\//, '');
                        // Construct the full path including 'scripts/' directory
                        let newImportPath = `https://${CLOUDFRONT_DOMAIN}/${S3_FOLDER}scripts/${importPath}?v=${deploymentTimestamp}`;
                        let importStatement = `import `;
                        if (namedImports) {
                            importStatement += `${namedImports} `;
                        } else if (defaultImport) {
                            importStatement += `${defaultImport} `;
                        } else if (namespaceImport) {
                            importStatement += `* as ${namespaceImport} `;
                        }
                        importStatement += `from "${newImportPath}";`;
                        console.log(`Updated import: ${match} -> ${importStatement}`);
                        return importStatement;
                    }
                    return match;
                }
            );
            console.log(`Processed imports in ${filePath}`);
        }
        
        // Add versioning to external URLs in HTML files
        if (fileExt === '.html') {
            content = content.replace(
                /(src|href|import)=["'](https:\/\/d12n4cwg3u8b3y\.cloudfront\.net\/[^"']+)["']/g,
                (match, attr, url) => {
                    if (!url.includes('?')) {
                        let newUrl = `${url}?v=${deploymentTimestamp}`;
                        console.log(`Updated external URL: ${match} -> ${attr}="${newUrl}"`);
                        return `${attr}="${newUrl}"`;
                    }
                    return match;
                }
            );

            // Add versioning to import statements in HTML files
            content = content.replace(
                /import\s+(\{[^}]+\})\s+from\s+['"](https:\/\/d12n4cwg3u8b3y\.cloudfront\.net\/[^"']+)['"];?/g,
                (match, namedImports, importPath) => {
                    if (!importPath.includes('?')) {
                        let newImportPath = `${importPath}?v=${deploymentTimestamp}`;
                        let importStatement = `import ${namedImports} from "${newImportPath}";`;
                        console.log(`Updated import: ${match} -> ${importStatement}`);
                        return importStatement;
                    }
                    return match;
                }
            );

            // Add versioning to all imports in HTML files
            content = content.replace(
                /import\s+(?:(\{[^}]+\})|(\w+)|\*\s+as\s+(\w+))\s+from\s+['"](\/dist\/[^"']+)['"];?/g,
                (match, namedImports, defaultImport, namespaceImport, importPath) => {
                    let newImportPath = `https://${CLOUDFRONT_DOMAIN}/${S3_FOLDER}${importPath.replace(/^\/dist\//, '')}?v=${deploymentTimestamp}`;
                    let importStatement = `import `;
                    if (namedImports) {
                        importStatement += `${namedImports} `;
                    } else if (defaultImport) {
                        importStatement += `${defaultImport} `;
                    } else if (namespaceImport) {
                        importStatement += `* as ${namespaceImport} `;
                    }
                    importStatement += `from "${newImportPath}";`;
                    console.log(`Updated import: ${match} -> ${importStatement}`);
                    return importStatement;
                }
            );
        }

        if (content !== originalContent) {
            console.log(`File ${filePath} was modified.`);
        } else {
            console.log(`File ${filePath} was not modified.`);
        }
    }
    
    content = ensureDoctype(content, filePath);
    
    return content;
}

function uploadFileToS3(filePath, s3Key) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, fileContent) => {
            if (err) {
                console.error(`Error reading file ${filePath}: ${err}`);
                reject(err);
                return;
            }

            const contentType = getContentType(filePath);
            const isHtml = contentType === 'text/html';
            const isJs = filePath.endsWith('.js');

            if (isHtml || isJs || filePath.endsWith('.css')) {
                fileContent = processFileContent(fileContent.toString(), filePath);
            }

            const params = {
                Bucket: S3_BUCKET,
                Key: s3Key,
                Body: fileContent,
                ContentType: contentType,
                CacheControl: isHtml || isJs ? 'no-cache, no-store, must-revalidate' : 'public, max-age=31536000, immutable'
            };

            s3.upload(params, (err, data) => {
                if (err) {
                    console.error(`Error uploading ${filePath}: ${err}`);
                    reject(err);
                } else {
                    console.log(`Successfully uploaded ${filePath} to ${data.Location}`);
                    resolve();
                }
            });
        });
    });
}

// Function to get content type based on file extension
function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };
    return contentTypes[ext] || 'application/octet-stream';
}

// Function to recursively upload directory contents
async function uploadDirectory(dirPath, s3Prefix, contentVersions) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const s3Key = path.join(s3Prefix, file).replace(/\\/g, '/').replace(/^dist\//, '');

        if (fs.statSync(filePath).isDirectory()) {
            await uploadDirectory(filePath, s3Key, contentVersions);
        } else {
            if (!filePath.endsWith('.map')) {
                await uploadFileToS3(filePath, s3Key, contentVersions);
            } else {
                console.log(`Skipping ${filePath} (source map file)`);
            }
        }
    }
}

// Function to create a CloudFront invalidation
async function createInvalidation() {
    const params = {
        DistributionId: CLOUDFRONT_DISTRIBUTION_ID,
        InvalidationBatch: {
            CallerReference: Date.now().toString(),
            Paths: {
                Quantity: 1,
                Items: ['/*']
            }
        }
    };

    try {
        const data = await cloudfront.createInvalidation(params).promise();
        console.log(`Invalidation created: ${data.Invalidation.Id}`);
    } catch (error) {
        console.error('Error creating invalidation:', error);
    }
}

// Function to list recent invalidations
async function listInvalidations() {
    const params = {
        DistributionId: CLOUDFRONT_DISTRIBUTION_ID,
        MaxItems: '5'
    };

    try {
        const data = await cloudfront.listInvalidations(params).promise();
        console.log('Recent invalidations:');
        data.InvalidationList.Items.forEach(item => {
            console.log(`ID: ${item.Id}, Status: ${item.Status}, Created: ${item.CreateTime}`);
        });
    } catch (error) {
        console.error('Error listing invalidations:', error);
    }
}

// Main deploy function
async function deploy() {
    try {
        S3_FOLDER = `${S3_ROOT_FOLDER}/${S3_SUB_FOLDER}/`;

        console.log('Starting build process...');
        await runBuild();

        console.log('Build complete. Deleting existing files in S3...');
        await deleteExistingFiles();

        console.log('Starting upload to S3...');
        const contentVersions = {};
        await uploadDirectory(BUILD_OUTPUT_DIR, S3_FOLDER, contentVersions);

        console.log('Content versions:', contentVersions);

        console.log('Creating CloudFront invalidation...');
        await createInvalidation();

        console.log('Listing recent invalidations...');
        await listInvalidations();

        console.log('Deployment complete!');
    } catch (error) {
        console.error('Deployment failed:', error);
        if (error.code) {
            console.error(`Error code: ${error.code}`);
        }
        if (error.stack) {
            console.error('Stack trace:', error.stack);
        }
    }
}

// Run the deploy function
deploy();