/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function (text) {
    var counts = new Array(26).fill(0);
    for (var i = 0; i < text.length; i++) {
        counts[text.charCodeAt(i) - 97]++;
    }
    // balloon needs b, a, n once and l, o twice; the scarcest letter caps
    // the whole word.
    return Math.min(counts[1], counts[0], counts[13], Math.floor(counts[11] / 2), Math.floor(counts[14] / 2));
};
