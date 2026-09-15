/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    // Greedy two pointers with one remembered star: every '*' is first
    // matched to the empty run, and a later mismatch backtracks to the most
    // recent star and lets it absorb one more character of s.
    const n = s.length;
    const m = p.length;
    let si = 0;
    let pi = 0;
    let star = -1;
    let restart = 0;
    while (si < n) {
        if (pi < m && (p[pi] === "?" || p[pi] === s[si])) {
            si += 1;
            pi += 1;
        } else if (pi < m && p[pi] === "*") {
            // Provisional choice: the star matches nothing yet.
            star = pi;
            restart = si;
            pi += 1;
        } else if (star !== -1) {
            // Mismatch after a star: the star absorbs one more character
            // of s, and the pattern replays from just after it.
            restart += 1;
            si = restart;
            pi = star + 1;
        } else {
            return false;
        }
    }
    // Only trailing stars can still match the empty remainder of s.
    while (pi < m && p[pi] === "*") {
        pi += 1;
    }
    return pi === m;
};
