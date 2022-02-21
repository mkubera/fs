import fs from "fs";

const fsPromises = fs.promises;

// fsPromises
//   .readFile(process.cwd() + "/package.json")
//   .then((d) => console.log(d.toString()))
//   .catch((err) => console.log(err.message));

fsPromises
  .readdir(process.cwd())
  .then((files) => {
    return Promise.all(
      files.map(async (filename) => {
        const stats = await fsPromises.stat(filename);
        return {
          Name: filename,
          Size: stats.size,
          Date: stats.mtime,
        };
      })
    );
  })
  .then((result) => console.table(result));
