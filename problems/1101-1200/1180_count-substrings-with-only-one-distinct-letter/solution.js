/**
 * @param {string} s
 * @return {number}
 */
var countLetters = function (s) {
    var total = 0;
    var run = 0;
    var prev = "";
    for (var i = 0; i < s.length; i++) {
        var ch = s[i];
        // Extend the current uniform run, or start a new one; adding the run
        // length each step sums L(L+1)/2 per maximal run.
        if (ch === prev) {
            run++;
        } else {
            run = 1;
            prev = ch;
        }
        total += run;
    }
    return total;
};
