import * as functions from "firebase-functions";

// @ts-ignore
export const uploadData = functions.https.onRequest(
  (req: any, res: any) => {
    console.log("Start of request");
    try {
      if (req.method !== "POST") {
        res.statusCode = 405;
        res.setHeader("Content-Type", "text/plain");
        res.end("Method Not Allowed");
      }

      console.log("Processing POST request");

      // Initialize Busboy with request headers
      console.log("req.body", JSON.stringify(req.body));
      res.end(JSON.stringify(req.body));
    // return 'ok'
    } catch (e) {
      console.error("Error:", e);
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal server error.");
    }
  });
