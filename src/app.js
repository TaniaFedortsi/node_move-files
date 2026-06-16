/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const app = () => {
  const sourcePath = process.argv[2];
  const destinationPath = process.argv[3];
  let finalDestination = destinationPath;

  if (!sourcePath || !destinationPath) {
    console.error('Missing arguments');

    return;
  }

  if (sourcePath === destinationPath) {
    return;
  }

  if (destinationPath[destinationPath.length - 1] === '/') {
    if (!fs.existsSync(destinationPath)) {
      console.error('No such directory');

      return;
    } else {
      finalDestination = path.join(destinationPath, path.basename(sourcePath));
    }
  } else {
    if (
      fs.existsSync(destinationPath) &&
      fs.statSync(destinationPath).isDirectory()
    ) {
      finalDestination = path.join(destinationPath, path.basename(sourcePath));
    }
  }

  try {
    const content = fs.readFileSync(sourcePath);

    fs.writeFileSync(finalDestination, content);
    fs.unlinkSync(sourcePath);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { app };

app();
