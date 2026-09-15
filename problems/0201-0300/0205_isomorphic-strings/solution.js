/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
    // The contract is symmetric and names its own data structure: every
    // character of s keeps one consistent replacement (forward), and no
    // two characters share a replacement (reverse). Each clause is one
    // map, enforced together in a single order-preserving pass.
    if (s.length !== t.length) {
        // Strings of different lengths can never be aligned position for position.
        return false;
    }
    const forward = new Map();
    const reverse = new Map();
    for (let index = 0; index < s.length; ++index) {
        const sChar = s[index],
            tChar = t[index];
        // One branch per contract clause: a source already bound to a
        // different replacement, or a target already claimed by another source.
        if (forward.has(sChar) && forward.get(sChar) !== tChar) return false;
        if (reverse.has(tChar) && reverse.get(tChar) !== sChar) return false;
        forward.set(sChar, tChar);
        reverse.set(tChar, sChar);
    }
    return true;
};
