/**
 * @param {string[]} words
 * @return {string[]}
 */
var removeAnagrams = function (words) {
    const result = [];
    let prev = "";
    for (const word of words) {
        const signature = word.split("").sort().join("");
        if (signature !== prev) {
            result.push(word);
            prev = signature;
        }
    }
    return result;
};
