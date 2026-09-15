/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var numberOfSubstrings = function (s, k) {
    const n = s.length;
    const count = new Array(26).fill(0);
    let sat = 0; // number of characters whose window count has reached k
    let r = 0;
    let total = 0;
    for (let l = 0; l < n; l++) {
        // Window is [l, r). Extend until some character reaches count k:
        // validity only grows as the window widens, so the first end that
        // works for l also works for every larger end.
        while (r < n && sat === 0) {
            const c = s.charCodeAt(r) - 97;
            count[c]++;
            if (count[c] === k) sat++;
            r++;
        }
        if (sat === 0) break; // no window from l (or any later l) can become valid
        // [l, r - 1] is the minimal valid window from l, so exactly the
        // ends r - 1 .. n - 1 are valid: n - (r - 1) substrings.
        total += n - (r - 1);
        const c = s.charCodeAt(l) - 97;
        if (count[c] === k) sat--;
        count[c]--;
    }
    // The answer peaks at n * (n + 1) / 2 <= 4.5e10 for n = 3e5, well
    // below 2 ** 53, so double precision integers represent it exactly.
    return total;
};
