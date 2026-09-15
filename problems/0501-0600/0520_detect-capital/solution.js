/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
    // The three legal usages differ only in how many capitals the word
    // holds and where they sit, so one sweep that counts capitals in the
    // ASCII upper range captures everything there is to check.
    let capitals = 0;
    for (let i = 0; i < word.length; ++i) {
        const code = word.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            capitals++;
        }
    }
    // No capitals is the all-lowercase word, every character a capital
    // is the all-caps word, and a lone capital is legal only when it
    // leads the word.
    const first = word.charCodeAt(0);
    return capitals === 0 || capitals === word.length || (capitals === 1 && first >= 65 && first <= 90);
};
