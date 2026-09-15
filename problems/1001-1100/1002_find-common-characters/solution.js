/**
 * @param {string[]} words
 * @return {string[]}
 */
var commonChars = function (words) {
    // Fold every word's 26-length letter-count array into a running
    // element-wise minimum; a letter absent from any single word is
    // pinned to zero from that point on.
    let common = new Array(26).fill(0);
    words.forEach((word, i) => {
        const counts = new Array(26).fill(0);
        for (const c of word) {
            counts[c.charCodeAt(0) - 97]++;
        }
        if (i === 0) {
            common = counts;
        } else {
            for (let j = 0; j < 26; j++) {
                common[j] = Math.min(common[j], counts[j]);
            }
        }
    });
    // Reading the surviving counts off from 'a' to 'z' builds the answer
    // directly in ascending alphabetical order.
    const result = [];
    for (let i = 0; i < 26; i++) {
        for (let k = 0; k < common[i]; k++) {
            result.push(String.fromCharCode(97 + i));
        }
    }
    return result;
};
