/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minimumChanges = function (s, k) {
    const n = s.length;
    // Proper divisors of every length L: 1 <= d < L. A part of length 1
    // has none, so every part of a valid partition has length >= 2.
    const divisors = Array.from({ length: n + 1 }, () => []);
    for (let d = 1; d <= n >> 1; ++d) {
        for (let length = 2 * d; length <= n; length += d) divisors[length].push(d);
    }
    const INF = Number.MAX_SAFE_INTEGER;
    // cost[i][j]: min letter changes turning s[i..j] into a
    // semi-palindrome, minimized over its proper divisors d. For each d
    // the d repeating-pattern groups must each become a palindrome, and
    // a group costs one change per mismatched mirror pair.
    const codes = Array.from({ length: n }, (_, i) => s.charCodeAt(i));
    const cost = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i + 1 < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
            const length = j - i + 1;
            let best = INF;
            for (const d of divisors[length]) {
                let changes = 0;
                for (let g = 0; g < d; ++g) {
                    const members = (((length - 1 - g) / d) | 0) + 1;
                    for (let a = g, b = g + (members - 1) * d; a < b; a += d, b -= d) {
                        if (codes[i + a] !== codes[i + b]) ++changes;
                    }
                }
                if (changes < best) best = changes;
            }
            cost[i][j] = best;
        }
    }
    // ways[i] for the current part count p: min changes splitting the
    // suffix s[i:] into p semi-palindrome parts. Transition: pick the
    // first part s[i..x] and add the (p - 1)-part cost of s[x + 1:].
    let cur = cost.map((row, i) => row[n - 1]);
    let prev = new Array(n).fill(0);
    for (let parts = 2; parts <= k; ++parts) {
        [cur, prev] = [prev, cur];
        cur.fill(INF);
        // First part s[i..x] needs x - i + 1 >= 2 and the remaining
        // suffix needs length >= 2 * (parts - 1): x <= n - 2*parts + 1.
        const lastStart = n - 2 * parts + 1;
        for (let i = 0; i < lastStart; ++i) {
            let best = INF;
            const row = cost[i];
            for (let x = i + 1; x <= lastStart; ++x) {
                if (row[x] + prev[x + 1] < best) best = row[x] + prev[x + 1];
            }
            cur[i] = best;
        }
    }
    return cur[0];
};
