const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid"); // make sure to npm install uuid (library for creating random id's)

// Get all comments
// -------------------
router.get("/", (req, res) => {
  // - read feedback data from json file
  // - parse json data into a javascript object
  const videoJSON = fs.readFileSync("./data/video-details.json");
  const video = JSON.parse(videoJSON);

  res.status(200).send(video);
});

// Get one comment using req.params
// ----------------------------------
router.get("/:videoId", (req, res) => {
  // Get the id from the request params
  //   const params = req.params;
  const { videoId } = req.params;
  console.log("params: ", videoId);

  // - read video data from json file
  // - parse json data into a javascript object
  const videoJSON = fs.readFileSync("./data/video-details.json");
  const video = JSON.parse(videoJSON);

  // find the video item using the videoId passed through params
  const selectedVideo = video.find(
    (videoItem) => videoItem.id === videoId
  );

  res.status(200).send(selectedVideo);
});

// post new comment
// -------------------
router.post("/", (req, res) => {
  console.log(req.body);

  // - read video data from json file
  // - parse json data into a javascript object
  const videoJSON = fs.readFileSync("./data/video-details.json");
  const video = JSON.parse(videoJSON);

  // create new video object using the information from the request body
  const newVideoItem = {
    id: uuid(),
    title: req.body.title,// TODO add title from axios.post/react application form field
    channel: "New Video",
    image: "http://localhost:5050/images/image0.jpg", // TODO add default image from server, e.g. /images/default.jpg
    description: req.body.description, // TODO add description from axios.post/react application form field
    views: "0",
    likes: "0",
    duration: "8:00",
    video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
    timestamp: Date.now(), // TODO use Date.now() to generate timestamp
    comments: [
      {
          "id": "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
          "name": "Test1",
          "comment": "Test comment 1",
          "likes": 0,
          "timestamp": 1691731062000
      },
      {
          "id": "091de676-61af-4ee6-90de-3a7a53af7521",
          "name": "Test2",
          "comment": "Test comment 2",
          "likes": 0,
          "timestamp": 1691644662000
      },
      {
          "id": "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
          "name": "Test3",
          "comment": "Test comment 3",
          "likes": 0,
          "timestamp": 1691558262000
      }
  ]
  };

  // add new item to the video javascript array
  video.push(newVideoItem);

  // - stringify the video array to turn it back into JSON
  // - write to the video.json file using the fs library
  const videoSTRINGIFIED = JSON.stringify(video);
  fs.writeFileSync("./data/video-details.json", videoSTRINGIFIED);

  res.status(201).send("video submission success");
});

module.exports = router;
