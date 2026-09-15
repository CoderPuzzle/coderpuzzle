/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
    // Typing is a story told right-to-left: each '#' deletes the nearest
    // character to its left that survives, and backspacing an empty text
    // leaves it empty. Walk both strings from the end, skip everything that
    // gets deleted, and compare the survivors pairwise.
    function settle(text, index) {
        let skip = 0;
        while (index >= 0) {
            if (text[index] === "#") skip++;
            else if (skip > 0) skip--;
            else return index;
            index--;
        }
        return -1;
    }
    let i = s.length - 1;
    let j = t.length - 1;
    while (true) {
        i = settle(s, i);
        j = settle(t, j);
        if (i < 0 || j < 0) {
            // One text ran out: equal only if both did, so both-empty counts
            // as equal and a lone survivor decides false.
            return i === j;
        }
        if (s[i] !== t[j]) return false;
        i--;
        j--;
    }
};
