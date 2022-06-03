#!/usr/bin/env node 
// Simple program to merge PDF files. Will also convert powerpoints. Automatically deletes originals. 
// Please run npm install fs path pdf-merger-js awesome-unoconv

// Require NPM libraries
const fs = require('fs');
const path = require('path');
const PDFMerger = require('pdf-merger-js');
const unoconv = require('awesome-unoconv');

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


// Pause function 
function sleep(milliseconds) {
    // Get current time 
    const date = Date.now();
    let currentDate = null;

    do { // Set time and calc difference 
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
  


// Automatic MAIN function 
(async () => {
    try{
        console.log("[Notify] Beginning merging process...");

        // Get all the files in the directory into an array 
        const files = await fs.readdirSync(directory);

        // Get the size of the folder 
        const size = files.length;
        console.log(`[Notify] Found ${size} files in the directory.`);

        // Make sure the directory isnt too large 
        if (size >= 100) {
            console.log("[Error] Too many files in the directory! " + size);
            console.log("[Notify] The limit is 100 files. You can change this in the source code.");
            return;
        // Make sure the directory has at least 2 files 
        } else if (size <= 3) {
            console.log("[Error] Not enough files in the directory! ", size - 1); 
            console.log("[Notify] You need at least 2 files present.");
            return;
        }

        // Check if a file with the same name as the merged file already exists
        if (fs.existsSync(`${directory}/merged.pdf`)) {

            fs.unlinkSync(`${directory}/merged.pdf`);

            console.log("[Notify] Deleted original merged.pdf");
        }

        console.log("[Notify] Checking for valid PDF's...");

        // Loop through each file 
        for (let file in files){

            // Check if the file is a powerpoint file 
            if (path.extname(files[file]) === ".pptx" || path.extname(files[file]) === ".ppt" ) {

                // Make sure that a PDF with the file name doesnt already exist 
                if (!fs.existsSync(path.resolve(files[file].replace("pptx", "pdf")))) {
                    console.log(`[Conversion] Found a PPTX to convert: ${files[file]}`);
                
                    // Grab paths and rename
                    let source = path.resolve(files[file]); 
                    let dest = "";
                    let new_file = ""
                    try {
                        new_file = files[file].replace("pptx", "pdf"); 
                        dest = path.resolve(new_file); 
                    } catch (error) {
                        new_file = files[file].replace("ppt", "pdf"); 
                        dest = path.resolve(new_file); 
                    }
    
                    // Begin conversion to PDF
                    try {
                        await unoconv
                        .convert(source, dest)
                        .then(result => {

                            // Delete original file 
                            fs.unlinkSync(source);
                            console.log("[Notify] Deleted original conversion file");
                            return; 
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    } catch (error) {
                        console.log(error.message);
                    }

                    // Add the new file name to PDFs
                    pdfs.push(new_file); 
                }
            }
            
            // Check if the file is a PDF file
            if (path.extname(files[file]) == ".pdf" && files[file] != "merged.pdf") {

                console.log(`[Notify] Found a valid PDF file: ${files[file]}`);
                
                // Add the PDF buffer to array 
                //pdfs.push(fs.readFileSync(files[file]));
                pdfs.push(files[file]);
            }

        }

        sleep(10000);

        // Check if there are enough valid PDF's
        if (pdfs.length < 2) {
            console.log("[Error] Not enough valid PDF's!");
            console.log("[Notify] You need at least 2 valid PDF's to merge.");
            return;
        }

        // Create a new PDFMerger instance
        var merger = new PDFMerger(); 
  
        console.log("[Notify] Adding files to merger");

        // Combine all the PDF's into one
        for (let file in pdfs) {
            try {
                (async() =>{
                    // Add all the PDF's to the merger
                    merger.add(pdfs[file]);
                    //console.log("[Notificaiton] " + pdfs[file] + " has been added to the merger.");
                })(); // Call function immediately 
            }
            catch (error) {
                console.log(error);
            }
        }
        // Save as a new file 
        await merger.save('merged.pdf');
        
        console.log("[Success] Merging process has been completed successfully!");
        console.log("[Complete] New merged PDF saved as 'merged.pdf'.");

        console.log("[Notify] Deleting original pdf files");

        // Go through and delete all originals from PDFs array 
        for (file in pdfs) {
            fs.unlinkSync(`${directory}/${pdfs[file]}`);
        }


    } catch (error) {
        console.log(error);
    }

})();// Call the anonymous function immediately
