/**
 * @param {string} word
 * @return {string}
 */
var compressedString = function (word) {
    // One sweep over the runs of equal characters, slicing each run
    // into chunks of at most nine because that is all one operation may
    // remove -- a length-14 run therefore encodes as "9c5c".
    const parts = [];
    let i = 0;
    const n = word.length;
    while (i < n) {
        let j = i;
        while (j < n && word[j] === word[i] && j - i < 9) {
            j++;
        }
        parts.push(String(j - i));
        parts.push(word[i]);
        i = j;
    }
    return parts.join("");
};
