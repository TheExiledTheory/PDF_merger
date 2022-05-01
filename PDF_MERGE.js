#!/usr/bin/env node 
// Simple program to merge PDF files. 
// Please run npm install fs path pdf-merger-js

// Require NPM libraries
const fs = require('fs');
const path = require('path');
const PDFMerger = require('pdf-merger-js');

// Setup global consts 
const directory = __dirname;
const pdfs = []; 



// This method was giving me severe trouble, so instead I opted to use the pdf-merger-js library. 
// UNUSUED FUNCTION 
// Function to read and append files 
function readAppend(file, appendFile) {

    // Attempt to read the file  
    fs.readFileSync(appendFile, function (err, data) {
        
        // Check for errors 
        if (err) throw err;
        console.log("[Notificaiton] " + appendFile + " has been read successfully.");
        

        // Attempt to write the file to merged.pdf 
        fs.appendFileSync(file, data, function (err) {
            // Check for errors
            if (err) throw err;
            console.log("[Notificaiton] " + appendFile + " has been appended to merged.pdf successfully.");
        });
    });
}
// UNUSUED FUNCTION 



// Automatic MAIN function 
(async () => {
    try{
        console.log("[Notification] Beginning merging process...");

        // Get all the files in the directory into an array 
        const files = await fs.readdirSync(directory);

        // Get the size of the folder 
        const size = files.length;
        console.log(`[Notification] Found ${size} files in the directory.`);

        // Make sure the directory isnt too large 
        if (size >= 100) {
            console.log("[Error] Too many files in the directory! " + size);
            console.log("[Notification] The limit is 100 files. You can change this in the source code.");
            return;
        // Make sure the directory has at least 2 files 
        } else if (size < 3) {
            console.log("[Error] Not enough PDF's files in the directory! ", size - 1); 
            console.log("[Notification] You need at least 2 PDF files present.");
            return;
        }

        // Check if a file with the same name as the merged file already exists
        if (fs.existsSync(`${directory}/merged.pdf`)) {

            console.log("[Error] A file with the same name as the merged file already exists!");
            
            fs.unlinkSync(`${directory}/merged.pdf`);

            console.log("[Notification] The file has been deleted.");
        }

        console.log("[Notification] Checking for valid PDF's...");

        // Loop through each file 
        for (let file in files){

            // Check if the file is a PDF file
            if (path.extname(files[file]) == ".pdf" && files[file] != "merged.pdf") {

                console.log(`[Notification] Found a valid PDF file: ${files[file]}`);
                
                // Add the PDF files to array without reading 
                pdfs.push(files[file]);
            }

        }

        // Check if there are enough valid PDF's
        if (pdfs.length < 2) {
            console.log("[Error] Not enough valid PDF's!");
            console.log("[Notification] You need at least 2 valid PDF's to merge.");
            return;
        }

        // Create a new PDFMerger instance
        var merger = new PDFMerger(); 
  

        // Combine all the PDF's into one
        for (let file in pdfs) {
            try {
                (async() =>{
                    // Add all the PDF's to the merger
                    merger.add(pdfs[file]);
                    console.log("[Notificaiton] " + pdfs[file] + " has been added to the merger.");
                })(); // Call function immediately 
            }
            catch (error) {
                console.log(error);
            }
        }
        // Save as a new file 
        await merger.save('merged.pdf');
        
        console.log("[Notification] Merging process has been completed successfully!");
        console.log("[Complete] New merged PDF saved as 'merged.pdf'.");


    } catch (error) {
        console.log(error);
    }
})();// Call the anonymous function immediately
