/**
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function (word) {
    // Special means every lowercase occurrence sits before the first
    // uppercase one, i.e. last-lower index < first-upper index; both
    // positions per letter are captured in a single pass.
    const firstUpper = new Array(26).fill(-1);
    const lastLower = new Array(26).fill(-1);
    for (let position = 0; position < word.length; position++) {
        const code = word.charCodeAt(position);
        if (code >= 97) {
            lastLower[code - 97] = position;
        } else if (firstUpper[code - 65] === -1) {
            firstUpper[code - 65] = position;
        }
    }
    let count = 0;
    for (let k = 0; k < 26; k++) {
        if (firstUpper[k] !== -1 && lastLower[k] !== -1 && lastLower[k] < firstUpper[k]) {
            count++;
        }
    }
    return count;
};
