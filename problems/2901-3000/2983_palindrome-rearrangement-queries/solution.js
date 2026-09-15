/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var canMakePalindromeQueries = function (s, queries) {
    const n = s.length;
    const half = n / 2;
    // prefix[i + 1][k] = occurrences of 'a' + k in s[0..i]
    const prefix = new Array(n + 1);
    prefix[0] = new Array(26).fill(0);
    for (let i = 0; i < n; ++i) {
        prefix[i + 1] = prefix[i].slice();
        ++prefix[i + 1][s.charCodeAt(i) - 97];
    }
    // mismatch[i + 1] = pairs (x, n-1-x), x <= i, whose characters differ —
    // pairs a query repairs only by covering x or its mirror on its side.
    const mismatch = new Array(half + 1).fill(0);
    for (let x = 0; x < half; ++x) {
        mismatch[x + 1] = mismatch[x] + (s[x] !== s[n - 1 - x] ? 1 : 0);
    }

    // Pieces of [lo1, hi1] that avoid [lo2, hi2]: pushes [lo, hi] pairs.
    const pieces = (lo1, hi1, lo2, hi2) => {
        const out = [];
        if (lo1 > hi1) return out;
        if (hi2 < lo1 || lo2 > hi1) out.push([lo1, hi1]);
        else {
            if (lo1 < lo2) out.push([lo1, lo2 - 1]);
            if (hi2 < hi1) out.push([hi2 + 1, hi1]);
        }
        return out;
    };

    const answer = new Array(queries.length);
    for (let index = 0; index < queries.length; ++index) {
        const [a, b, c, d] = queries[index];
        const m1 = n - 1 - b,
            m2 = n - 1 - a; // mirror of [a, b], right half
        const f1 = n - 1 - d,
            f2 = n - 1 - c; // mirror of [c, d], left half
        // Pairs covered on neither side must already match.
        let bad = 0;
        for (const [lo, hi] of pieces(0, a - 1, f1, f2).concat(pieces(b + 1, half - 1, f1, f2))) {
            bad += mismatch[hi + 1] - mismatch[lo];
        }
        if (bad > 0) {
            answer[index] = false;
            continue;
        }
        // Pool balance per letter: A + F_L == B + F_R with A covering F_R.
        const fixedL = pieces(f1, f2, a, b);
        const fixedR = pieces(m1, m2, c, d);
        let ok = true;
        for (let k = 0; k < 26 && ok; ++k) {
            const poolA = prefix[b + 1][k] - prefix[a][k];
            const poolB = prefix[d + 1][k] - prefix[c][k];
            let left = poolA;
            let right = poolB;
            let needR = 0;
            for (const [lo, hi] of fixedL) left += prefix[hi + 1][k] - prefix[lo][k];
            for (const [lo, hi] of fixedR) {
                const piece = prefix[hi + 1][k] - prefix[lo][k];
                right += piece;
                needR += piece;
            }
            if (left !== right || poolA < needR) ok = false;
        }
        answer[index] = ok;
    }
    return answer;
};
