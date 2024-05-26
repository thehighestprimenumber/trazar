/*
const fs = require("fs");
const ftp = require("ftp");
const path = require("node:path");

function printFileContents(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
    } else {
      console.log("File contents:");
      console.log(data);
    }
  });
}

function uploadFileToFTP(localFilePath, remoteFilePath, ftpConfig) {
  const client = new ftp();

  const finalPath = path.join(__dirname, "test.txt");

  client.on("ready", () => {
    client.put(finalPath, remoteFilePath, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
      } else {
        console.log("File uploaded successfully");
      }
      client.end();
    });
  });

  client.on("error", (err) => {
    console.error("FTP client error:", err);
  });

  client.connect(ftpConfig);
}

// Example usage
const localFilePath = "/home/nina/dev/trazar/functions/src/test.txt";
const remoteFilePath = "Transfer/Cloud/maru-test.txt";
const ftpConfig = {
  host: config.FTP_HOST
  port: config.FTP_PORT
  user: config.FTP_USER
  password: config.FTP_PASSWORD
};


const FTP = require("ftp");

function readFtpFile({host, user, password}, filePath) {
  const client = new FTP();

  client.on("ready", () => {
    client.get(filePath, (err, stream) => {
      if (err) {
        console.error(`Error: ${err.message}`);
        client.end();
        return;
      }

      stream.on("data", (chunk) => {
        process.stdout.write(chunk.toString("utf8"));
      });

      stream.on("end", () => {
        console.log("\nFile transfer completed successfully.");
        client.end();
      });

      stream.on("error", (err) => {
        console.error(`Stream Error: ${err.message}`);
        client.end();
      });
    });
  });

  client.on("error", (err) => {
    console.error(`FTP Client Error: ${err.message}`);
  });

  client.connect({
    host: host,
    user: user,
    password: password,
  });
}

// Example usage:
// readFtpFile(ftpConfig, 'maru-test.txt');

uploadFileToFTP(localFilePath, remoteFilePath, ftpConfig);
*/
