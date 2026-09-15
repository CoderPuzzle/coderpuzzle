/**
 * @param {string} s
 * @return {number}
 */
var numberOfSpecialSubstrings = function (s) {
    // last[c] is the most recent index of c; left is the smallest window
    // start keeping s[left..i] free of repeating characters.
    const last = new Array(26).fill(-1);
    let left = 0;
    let ans = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i) - 97;
        // An occurrence left of the window yields last[c] + 1 <= left, so
        // stale entries leave the window untouched.
        left = Math.max(left, last[c] + 1);
        // Every start in [left..i] ends a special substring at i.
        ans += i - left + 1;
        last[c] = i;
    }
    return ans;
};
