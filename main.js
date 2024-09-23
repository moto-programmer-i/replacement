// warning : This program may cause problems for large files.
// see https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText

import { Replacement } from "./modules/replacement.js";
import { FileUtils } from "./modules/file-utils.js";

const PATTERN_ID = "pattern";
const TARGET_ID = "target";
const REPLACE_ID = "replace";

document.getElementById(REPLACE_ID).addEventListener("click", main);


async function main() {
  try {
    const pattern = await FileUtils.readFileAsText(getFile(PATTERN_ID));
    const replacements = Replacement.readPatternTsv(pattern);
    
    const targetFile = getFile(TARGET_ID);
    let target = await FileUtils.readFileAsText(targetFile);

    for(const replacement of replacements) {
      target = replacement.replace(target);
    }

    FileUtils.saveFile(target, `replaced_${targetFile.name}`);
    
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

