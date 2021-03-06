const express = require("express");
const axios = require("axios").default;
const helmet = require("helmet");

const allowCrossDomain = require("./utils/cors");

const server = express();

server.use(helmet());
server.use(allowCrossDomain);

const url = "https://www.easports.com/fifa/ultimate-team";

server.get("/", (_, res) => {
  res.status(200).json({
    success: true
  });
});

/**
 * Get player from name
 */
server.get("api/:name", (req, res) => {
  const playerName = req.params.name;
  axios
    .get(`${url}/item?name=${playerName}`)
    .then(axiosRes => {
      const players = axiosRes.data.items;

      res.status(200).json({
        success: true,
        message: "Player Retrieved",
        data: players[0]
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      });
    });
});

server.listen(process.env.PORT || 3000);
