const JSZip = require("jszip");
const program = require("commander");

const fs = require("fs");
const path = require("path");

import renderDocument from "./renderDocument";

let outFile;

program
  .version("0.1.0")
  .arguments("[out]")
  // .option("-l, --layers [optional]", "Layers to append", x => JSON.parse(x))
  .action(out => {
    outFile = out;
  })
  .parse(process.argv);

if (!outFile) {
  console.log("Missing output file!");
  program.help();
}

console.log("writing to", outFile);

async function modifySketchTemplate(filename) {
  const data = fs.readFileSync(filename);
  const zip = await JSZip.loadAsync(data);

  const promises = [];

  zip.folder("pages").forEach(async (relativePath, file) => {
    promises.push(
      new Promise(async (resolve, reject) => {
        const contents = await file.async("string");
        const page = JSON.parse(contents);

        const layer = renderDocument();

        console.log(layer);

        page.layers.push(layer);

        zip.file(file.name, JSON.stringify(page));
        resolve();
      })
    );
  });

  await Promise.all(promises);

  if (outFile) {
    zip
      .generateNodeStream({ type: "nodebuffer", streamFiles: true })
      .pipe(fs.createWriteStream(outFile))
      .on("finish", function() {
        // JSZip generates a readable stream with a "end" event,
        // but is piped here in a writable stream which emits a "finish" event.
        console.log(outFile + " written");
      });
  }
}

function readFromStream(stream) {
  return new Promise(resolve => {
    let data = "";
    stream.on("data", chunk => data += chunk);
    stream.on("end", () => {
      resolve(data);
    });
  });
}

modifySketchTemplate(path.join(__dirname, "./templates/blank-46.2.sketch"));
