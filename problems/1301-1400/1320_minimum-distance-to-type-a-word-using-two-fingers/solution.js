/**
 * @param {string} word
 * @return {number}
 */
var minimumDistance = function (word) {
    // dp[o] = cheapest cost of the typed prefix with the resting finger on
    // letter o (o == 26 models the still-unused finger, distance 0).
    const dist = (a, b) => {
        if (a === 26 || b === 26) return 0;
        return Math.abs(Math.floor(a / 6) - Math.floor(b / 6)) + Math.abs((a % 6) - (b % 6));
    };
    let dp = new Array(27).fill(0);
    for (let i = 1; i < word.length; ++i) {
        const prev = word.charCodeAt(i - 1) - 65;
        const cur = word.charCodeAt(i) - 65;
        const step = dist(prev, cur);
        const nxt = new Array(27).fill(Infinity);
        for (let o = 0; o < 27; ++o) {
            const cost = dp[o];
            if (cost === Infinity) continue;
            if (cost + step < nxt[o]) nxt[o] = cost + step; // typing finger moves
            const move = cost + dist(o, cur); // resting finger types cur
            if (move < nxt[prev]) nxt[prev] = move;
        }
        dp = nxt;
    }
    return Math.min(...dp);
};
