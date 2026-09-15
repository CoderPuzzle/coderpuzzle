/**
 * @param {string} num
 * @return {boolean}
 */
var digitCount = function (num) {
    // One counting pass fills a fixed ten-slot tally; every index then
    // checks the tally against the digit recorded there.
    const counts = new Array(10).fill(0);
    for (const character of num) {
        counts[character.charCodeAt(0) - 48]++;
    }
    for (let i = 0; i < num.length; i++) {
        if (counts[i] !== num.charCodeAt(i) - 48) return false;
    }
    return true;
};
