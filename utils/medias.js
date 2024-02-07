const multer = require("multer");
const fs = require("fs");
const path = require("path");

const targetDirectory = "../medias";

function getRandomNumber(min, max) {
  const randomDecimal = Math.random();
  const randomInRange = randomDecimal * (max - min) + min;
  const randomInteger = Math.floor(randomInRange);
  return randomInteger;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, targetDirectory);

    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const randomFileName = `file_${getRandomNumber(
      1000,
      999999999999
    )}${fileExtension}`;
    cb(null, randomFileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
