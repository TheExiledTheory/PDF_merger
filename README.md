# PDF Merger


## Description

For this program to work, you will need at least 2 PDF's and no more than 100 total files in the root folder for the program. It will build all available PDF's into a single large file. 

I only allow for a maximum of 100 files to help ensure that the program does not hang searching through a large library. If needed, you can simply change that in the source. 

[Update] Since writing initially, I added the ability for it to convert powerpoint files to pdfs using a npm library called awesome-unoconv. By default, it will automatically remove all files used in merging. 


## Setup


### Dependencies
* npm 8.3.0
* nodejs 17.3.0
* fs 0.0.1 
* path 0.12.7
* pdf-merger-js 3.4.0

### Installing
* Run using node/terminal inside target folder
```
npm install fs path pdf-merger-js awesome-unoconv
```
### Executing 

* Simply place the source file into a folder with PDF's 
```
node PDF_MERGE.js
```

## Screenshots 

![Image1](https://github.com/TheExiledTheory/PDF_merger/blob/main/Images/Screenshot%20at%202022-04-28%2017-47-36.png)


![Image2](https://github.com/TheExiledTheory/PDF_merger/blob/main/Images/Screenshot%20at%202022-04-28%2017-48-26.png)


![Image3](https://github.com/TheExiledTheory/PDF_merger/blob/main/Images/Screenshot%20at%202022-04-28%2017-47-59.png)


![Image4](https://github.com/TheExiledTheory/PDF_merger/blob/main/Images/Screenshot%20at%202022-04-28%2017-50-12.png)
## Notes

You can feel free to bundle this into a singular program using something such as npm's [pkg library](https://www.npmjs.com/package/pkg). 

Be aware that this program was written and tested solely on Parrot GNU/Linux 4.10. I expect that it will work on Windows/MacOS however I have not tested.

I only tested this with a small input of 8 files ... the runtime is order N so the more PDF's that you want to concatenate, the longer it will take. 
