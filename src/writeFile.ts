import * as fsPromises from 'fs/promises';

    export async function writeMarkdownFile(filePath:string, response:string) {
        try {
            await fsPromises.writeFile(filePath, response);
            console.log('Markdown file written successfully (using promises).');
        } catch (err) {
            console.error('Error writing Markdown file (using promises):', err);
        }
    }