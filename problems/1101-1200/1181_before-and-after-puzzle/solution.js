/**
 * @param {string[]} phrases
 * @return {string[]}
 */
var beforeAndAfterPuzzles = function (phrases) {
    var n = phrases.length;
    var words = phrases.map(function (p) {
        return p.split(" ");
    });
    // File every phrase position under its first word: the bucket a
    // predecessor will search by its own last word.
    var byFirst = {};
    for (var i = 0; i < n; i++) {
        if (!byFirst[words[i][0]]) {
            byFirst[words[i][0]] = [];
        }
        byFirst[words[i][0]].push(i);
    }
    var results = new Set();
    for (var i2 = 0; i2 < n; i2++) {
        var last = words[i2][words[i2].length - 1];
        var bucket = byFirst[last] || [];
        for (var b = 0; b < bucket.length; b++) {
            var j = bucket[b];
            if (j === i2) {
                continue; // a phrase never pairs with its own position
            }
            var merged = phrases[i2];
            for (var k = 1; k < words[j].length; k++) {
                merged += " " + words[j][k];
            }
            results.add(merged);
        }
    }
    return Array.from(results).sort();
};
