import express from "express";
import fs from "fs";
import path from "path";

const app = express();

// get the index file
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./html/index.html"));
});

// we need the video size so we can tell the client how large is the stream
const { size } = fs.statSync("./video.mp4");

app.get("/video", (req, res) => {
    const stream = fs.createReadStream("./video.mp4", { start: 0, end: size });
    stream.pipe(res);
});

app.listen(80);

console.log('server running on port 80');