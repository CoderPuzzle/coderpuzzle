/**
 * @param {string} text
 * @param {string} brokenLetters
 * @return {number}
 */
var canBeTypedWords = function (text, brokenLetters) {
    // Broken keys form a set; a word is typable only when none of its
    // letters are in that set.
    const broken = new Set(brokenLetters);
    let count = 0;
    for (const word of text.split(" ")) {
        let ok = true;
        for (const ch of word) {
            if (broken.has(ch)) {
                ok = false;
                break;
            }
        }
        if (ok) {
            count++;
        }
    }
    return count;
};
