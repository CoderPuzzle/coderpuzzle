/**
 * @param {string} s
 * @return {boolean}
 */
var isSubstringPresent = function (s) {
    // A length-2 substring of s shows up in reverse(s) exactly when its
    // own reversal shows up somewhere in s, since reading s backwards
    // turns every adjacent pair xy into yx. One pass records each pair
    // in a set and looks the current pair up flipped — a hit on yx
    // means an earlier xy mirrors into it, and a later yx finds the xy
    // recorded before it. A doubled letter is its own reversal, so xx
    // matches the moment it appears.
    const seen = new Set();
    for (let i = 0; i + 1 < s.length; i++) {
        if (s[i] === s[i + 1] || seen.has(s[i + 1] + s[i])) return true;
        seen.add(s[i] + s[i + 1]);
    }
    return false;
};
