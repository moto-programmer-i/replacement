// warning : This program may cause problems for large files.
// see https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText

import { Replacement } from "./modules/replacement.js";

const PATTERN_ID = "pattern";
const TARGET_ID = "target";
const REPLACE_ID = "replace";

document.getElementById(PATTERN_ID).addEventListener("change", main);
// document.getElementById(REPLACE_ID).addEventListener("click", main);


async function main() {
  try {
    const pattern = await readFileAsText(getFile(PATTERN_ID));
    const replacements = Replacement.readPatternTsv(pattern);
    console.log(replacements);


    return;
    
    const target = await readFileAsText(getFile(TARGET_ID));
    
  }
  catch(error) {
    alert(error);
    console.error(error);
  }
}



/**
 * 
 * @param {string} id ID in HTML
 * @returns {File}
 */
function getFile(id) {
  return document.getElementById(id).files[0];
}

/**
 * ファイル読み込み
 * @param {File} file error if null
 * @returns {string} the content text
 */
async function readFileAsText(file) {
  if(file == null) {
    throw new Error("File not found");
  }

  // sync file read
  // https://stackoverflow.com/a/46568146
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}