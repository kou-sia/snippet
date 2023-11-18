// how to use
//
// node relocateFiles.js xxx yyy
//
// You can change file path xxx/yyy_AAA.bb to xxx/yyy/AAA.bb

if (process.argv.length <= 3) {
    console.error('Expected at least two argument!(xxx, yyy) You can change file path xxx/yyy_AAA.bb to xxx/yyy/AAA.bb');
    process.exit(1);
  }

const fs = require('fs');
const path = require('path');

const sourceDirectory = `./${process.argv[2]}`;
const targetDirectory = `${sourceDirectory}/${process.argv[3]}`;

// Ensure the target directory exists
if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory);
}

// Get a list of files in the source directory
const files = fs.readdirSync(sourceDirectory);

// Iterate through the files
files.forEach(file => {
    const isLifeFile = file.startsWith(`${process.argv[3]}_`);

    if (isLifeFile) {
        const renamedFile = file.substring(process.argv[3].length+1);
        console.log(`fileName : ${file} / rename: ${renamedFile}`);
        // Build the full paths
        const sourcePath = path.join(sourceDirectory, file);
        const targetPath = path.join(targetDirectory, renamedFile);
        console.log(`source: ${sourcePath} , target: ${targetPath}`)

        //Rename and move the file
        fs.renameSync(sourcePath, targetPath);

        console.log(`Moved and renamed: ${file} to ${renamedFile}`);
    }
});

console.log('Task completed!');
