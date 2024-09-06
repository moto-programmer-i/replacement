// warning : This program may cause problems for large files.
// see https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText

import { PATTERN_TSV_INDEX } from "./modules/pattern-tsv-index.js";
import { Replacement } from "./modules/replacement.js";

const PATTERN_ID = "pattern";
const TARGET_ID = "target";
const REPLACE_ID = "replace";

document.getElementById(PATTERN_ID).addEventListener("change", main);
// document.getElementById(REPLACE_ID).addEventListener("click", main);


async function main() {
  try {
    const pattern = await readFileAsText(getFile(PATTERN_ID));
    const replacements = patternTextToReplacements(pattern);
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
 * tsv format:
 * Pattern	Flags	Replacement
 * @param {string} tsv file content
 * @returns {Array<Replacement>}
 */
function patternTextToReplacements(tsv) {
  if (tsv == null) {
    throw new Error("no pattern text");
  }

  const replacements = new Array();

  // I would to read line by line, but I don't know it in Javascript
  const lines = tsv.split(/\r?\n/);

  // ignore the header
  for(let i = 1; i < lines.length; ++i) {
    // split one tab or spaces
    const words = lines[i].split(/\t|\s+/);
    
    replacements.push(new Replacement(
      words[PATTERN_TSV_INDEX.Pattern],
      words[PATTERN_TSV_INDEX.Flags],
      words[PATTERN_TSV_INDEX.Replacement]
    ));
  }

  return replacements;
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