"use strict";
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const namePage = "SITECON033";
const nameLngsFile = "assessment.json";
const lngs = ["en", "id", "vn", "th", "cn", "my"];
const dir = "./locales";

const createFolders = () => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  lngs.forEach((item) => {
    let path = dir + "/" + item;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  });
};

const createLngsFiles = () => {
  const result = excelToJson({
    sourceFile: "Website Machine Translate.xlsx",
    columnToKey: {
      A: "Screen",
      B: "English",
      C: "Russian",
      D: "Indonesian",
      E: "Vietnamese",
      F: "Thai",
      G: "Malaysian",
      H: "Chinese",
    },
    header: {
      rows: 1,
    },
  });

  let newResult;

  for (let key in result) {
    if (key.includes(namePage)) {
      newResult = result[key];
    }
  }

  let enFile = {};
  let idFile = {};
  let vnFile = {};
  let thFile = {};
  let myFile = {};
  let cnFile = {};

  newResult.forEach((item) => {
    const key = item.English.replace("✔ ", "");
    const en_value = item.English.replace("✔ ", "");
    enFile[key] = en_value;

    const id_value = item.Indonesian.replace("✔ ", "");
    idFile[key] = id_value;

    const vn_value = item.Vietnamese.replace("✔ ", "");
    vnFile[key] = vn_value;

    const th_value = item.Thai.replace("✔ ", "");
    thFile[key] = th_value;

    const my_value = item.Malaysian.replace("✔ ", "");
    myFile[key] = my_value;

    const cn_value = item.Chinese.replace("✔ ", "");
    cnFile[key] = cn_value;
  });

  fs.writeFileSync(dir + "/en/" + nameLngsFile, JSON.stringify(enFile));
  fs.writeFileSync(dir + "/id/" + nameLngsFile, JSON.stringify(idFile));
  fs.writeFileSync(dir + "/vn/" + nameLngsFile, JSON.stringify(vnFile));
  fs.writeFileSync(dir + "/th/" + nameLngsFile, JSON.stringify(thFile));
  fs.writeFileSync(dir + "/my/" + nameLngsFile, JSON.stringify(myFile));
  fs.writeFileSync(dir + "/cn/" + nameLngsFile, JSON.stringify(cnFile));
};

createFolders();
createLngsFiles();
