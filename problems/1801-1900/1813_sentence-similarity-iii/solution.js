/**
 * @param {string} sentence1
 * @param {string} sentence2
 * @return {boolean}
 */
var areSentencesSimilar = function (sentence1, sentence2) {
    // The shorter word list must be covered by a common prefix plus a
    // common suffix of the longer one; whatever sits between them is
    // the inserted sentence.
    const w1 = sentence1.split(" ");
    const w2 = sentence2.split(" ");
    let i = 0;
    while (i < w1.length && i < w2.length && w1[i] === w2[i]) {
        i++;
    }
    let j = 0;
    while (j < w1.length - i && j < w2.length - i && w1[w1.length - 1 - j] === w2[w2.length - 1 - j]) {
        j++;
    }
    return i + j >= Math.min(w1.length, w2.length);
};
