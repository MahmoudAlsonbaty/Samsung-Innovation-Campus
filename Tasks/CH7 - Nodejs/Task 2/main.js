const  { readFile } = require("fs/promises")
const fsp = require('node:fs/promises');
const path = require('path');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

if(process.argv.length < 3){
  console.log("No file name provided!");
  return;
}
fsp.stat(process.argv[2], function(err, stat) {
   if (err.code === 'ENOENT') {
      // file does not exist
      logger.error("File \"" + process.argv[2] + "\" does not exist!");
    } else {
        logger.error('Some error happened while checking if the file exists' +  err.code);
    }
  });


const inputFilePath = path.join(__dirname, process.argv[2]);
const outputFilePath = path.join(__dirname, 'output.txt');



// Setup logging
const transport = new DailyRotateFile({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  level: 'info'
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    transport,
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

async function readMyFile(filePath) {
    try {
        const data = await readFile(filePath)
        logger.info(`File read!!!!: ${filePath}`);
        logger.info(`File content: ${data}`);
        return data;

      } catch (error) {
        logger.error(`Error reading file, :'( ${error.message}`);
      }

}

async function writeFile(filePath, data) {
    await fsp.writeFile(filePath, data,(err) => {
        if (err){
            logger.error(`Error writing file :'(  ${filePath}: ${error.message}`);
            throw error;
        }else {
            logger.info(`File written DONE!!!: ${filePath}`);
         
        }
      }); 
  }


// Function to process the file
async function processFile(inputFilePath, outputFilePath) {
    try {
      const data = await readMyFile(inputFilePath);
      const timestamp = new Date().toISOString();
      const updatedData = `${data}\n\nTimestamp: ${timestamp}`;
      logger.info("updated data: " + updatedData);
      await writeFile(outputFilePath, updatedData);
      logger.info('File processing completed successfully');
    } catch (error) {
      logger.error(`Error processing file: ${error.message}`);
    }
  }
  
(async function() {
    await processFile(inputFilePath, outputFilePath);
  })();
