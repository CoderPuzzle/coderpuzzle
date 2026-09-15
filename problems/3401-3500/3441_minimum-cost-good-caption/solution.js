/**
 * @param {string} caption
 * @return {string}
 */
var minCostGoodCaption = function (caption) {
    // Suffix DP over run states plus a greedy walk. A[i][c] is the cheapest
    // completion of the remaining positions given a closed run (length >= 3)
    // of character c; a fresh run planted at i consumes i, i+1, i+2 and
    // re-enters the closed state at i+3, so switching away from c costs the
    // best "triple(i, ch) + A[i+3][ch]" over ch != c — kept as a top-2 pair
    // so excluding c itself stays O(1). The walk takes the smallest
    // character whose branch keeps the remaining budget achievable.
    const n = caption.length;
    if (n < 3) {
        return "";
    }
    const INF = 1 << 30;
    const src = new Array(n);
    for (let i = 0; i < n; ++i) src[i] = caption.charCodeAt(i) - 97;
    const A = new Array(26 * (n + 4)).fill(INF);
    for (let c = 0; c < 26; ++c) A[26 * n + c] = 0;
    const m1 = new Array(n).fill(INF);
    const m2 = new Array(n).fill(INF);
    const j1 = new Array(n).fill(-1);
    const j2 = new Array(n).fill(-1);
    for (let i = n - 1; i >= 0; --i) {
        const si = src[i];
        const rowNext = 26 * (i + 1);
        let best1 = INF;
        let best2 = INF;
        let idx1 = -1;
        let idx2 = -1;
        if (i + 3 <= n) {
            const s1 = src[i + 1];
            const s2 = src[i + 2];
            const rowTriple = 26 * (i + 3);
            for (let ch = 0; ch < 26; ++ch) {
                const v = Math.abs(si - ch) + Math.abs(s1 - ch) + Math.abs(s2 - ch) + A[rowTriple + ch];
                if (v < best1) {
                    best2 = best1;
                    idx2 = idx1;
                    best1 = v;
                    idx1 = ch;
                } else if (v < best2) {
                    best2 = v;
                    idx2 = ch;
                }
            }
            m1[i] = best1;
            j1[i] = idx1;
            m2[i] = best2;
            j2[i] = idx2;
        }
        const row = 26 * i;
        for (let c = 0; c < 26; ++c) {
            const extend = Math.abs(si - c) + A[rowNext + c];
            const switch_ = idx1 < 0 ? INF : idx1 !== c ? best1 : best2;
            A[row + c] = Math.min(extend, switch_);
        }
    }
    let budget = m1[0];
    let out = "";
    let r = 0;
    let c = -1; // trailing run length; 0 only before the first character
    for (let i = 0; i < n; ++i) {
        const si = src[i];
        let chosen;
        let cand;
        if (r === 1) {
            // a length-1 run must still reach length 3: needs i, i+1
            cand = i + 2 <= n ? Math.abs(si - c) + Math.abs(src[i + 1] - c) + A[26 * (i + 2) + c] : INF;
            chosen = c;
        } else if (r === 2) {
            cand = Math.abs(si - c) + A[26 * (i + 1) + c];
            chosen = c;
        } else {
            // free choice: extend the closed run, or plant a fresh one
            const ext = r === 3 ? Math.abs(si - c) + A[26 * (i + 1) + c] : INF;
            let pick = 27;
            let pickVal = INF;
            if (m1[i] === budget && j1[i] !== c) {
                pick = j1[i];
                pickVal = m1[i];
            } else if (m2[i] === budget && j2[i] !== c) {
                pick = j2[i];
                pickVal = m2[i];
            }
            if (ext === budget && c < pick) {
                pick = c;
                pickVal = ext;
            }
            chosen = pick;
            cand = pickVal;
        }
        // unreachable: every reachable state keeps a branch on budget
        if (cand !== budget) {
            return "";
        }
        out += String.fromCharCode(97 + chosen);
        budget -= Math.abs(si - chosen);
        if (r === 0 || (r === 3 && chosen !== c)) {
            r = 1;
            c = chosen;
        } else if (r < 3) {
            ++r;
        }
    }
    return out;
};
