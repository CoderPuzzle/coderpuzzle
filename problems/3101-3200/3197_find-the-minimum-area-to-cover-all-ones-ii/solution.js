/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumSum = function (grid) {
    const INF = 1 << 30;
    // Any two disjoint rectangles are separated by a straight line, so
    // three covers always admit a hierarchical split: peel one side band,
    // cover its ones with their tight box, and split the remainder into two
    // tight boxes with one internal cut. Trying every peel and cut over all
    // four rotations finds the optimum. Pieces track genuine tight extents
    // because a peeled band may hold empty rows inside its span.
    let best = INF;
    let g = grid;
    for (let rot = 0; rot < 4; ++rot) {
        const m = g.length;
        const n = g[0].length;
        const firsts = new Array(m).fill(-1);
        const lasts = new Array(m).fill(-1);
        for (let r = 0; r < m; ++r) {
            let lo = -1;
            let hi = -1;
            for (let c = 0; c < n; ++c) {
                if (g[r][c] === 1) {
                    if (lo === -1) lo = c;
                    hi = c;
                }
            }
            firsts[r] = lo;
            lasts[r] = hi;
        }
        for (let i = 1; i < m; ++i) {
            // single rect over the peeled band rows [0..i)
            let tany = false;
            let trlo = m;
            let trhi = -1;
            let tclo = n;
            let tchi = -1;
            for (let r = 0; r < i; ++r) {
                if (firsts[r] !== -1) {
                    tany = true;
                    trlo = Math.min(trlo, r);
                    trhi = Math.max(trhi, r);
                    tclo = Math.min(tclo, firsts[r]);
                    tchi = Math.max(tchi, lasts[r]);
                }
            }
            if (!tany) continue;
            const topArea = (trhi - trlo + 1) * (tchi - tclo + 1);

            // two rects over rows [i..m): horizontal cuts
            const sh = m - i;
            const sAny = new Array(sh + 1).fill(false);
            const sRlo = new Array(sh + 1).fill(0);
            const sRhi = new Array(sh + 1).fill(-1);
            const sClo = new Array(sh + 1).fill(n);
            const sChi = new Array(sh + 1).fill(-1);
            let brlo = sh;
            let brhi = -1;
            let bclo = n;
            let bchi = -1;
            let bany = false;
            for (let idx = sh - 1; idx >= 0; --idx) {
                if (firsts[i + idx] !== -1) {
                    bany = true;
                    brlo = Math.min(brlo, idx);
                    brhi = Math.max(brhi, idx);
                    bclo = Math.min(bclo, firsts[i + idx]);
                    bchi = Math.max(bchi, lasts[i + idx]);
                }
                sAny[idx] = bany;
                sRlo[idx] = brlo;
                sRhi[idx] = brhi;
                sClo[idx] = bclo;
                sChi[idx] = bchi;
            }
            let inner = INF;
            let prlo = sh;
            let prhi = -1;
            let pclo = n;
            let pchi = -1;
            let pany = false;
            for (let idx = 0; idx + 1 < sh; ++idx) {
                if (firsts[i + idx] !== -1) {
                    pany = true;
                    prlo = Math.min(prlo, idx);
                    prhi = Math.max(prhi, idx);
                    pclo = Math.min(pclo, firsts[i + idx]);
                    pchi = Math.max(pchi, lasts[i + idx]);
                }
                if (pany && sAny[idx + 1]) {
                    const cand =
                        (prhi - prlo + 1) * (pchi - pclo + 1) +
                        (sRhi[idx + 1] - sRlo[idx + 1] + 1) * (sChi[idx + 1] - sClo[idx + 1] + 1);
                    inner = Math.min(inner, cand);
                }
            }

            // two rects over rows [i..m): vertical cuts
            const colLo = new Array(n).fill(m);
            const colHi = new Array(n).fill(-1);
            const cseen = new Array(n).fill(false);
            for (let idx = 0; idx < sh; ++idx) {
                if (firsts[i + idx] === -1) continue;
                const row = g[i + idx];
                for (let c = firsts[i + idx]; c <= lasts[i + idx]; ++c) {
                    if (row[c] === 1) {
                        cseen[c] = true;
                        colLo[c] = Math.min(colLo[c], idx);
                        colHi[c] = Math.max(colHi[c], idx);
                    }
                }
            }
            const vAny = new Array(n + 1).fill(false);
            const vRlo = new Array(n + 1).fill(m);
            const vRhi = new Array(n + 1).fill(-1);
            const vClo = new Array(n + 1).fill(n);
            const vChi = new Array(n + 1).fill(-1);
            let vrlo = m;
            let vrhi = -1;
            let vclo = n;
            let vchi = -1;
            let vany = false;
            for (let c = n - 1; c >= 0; --c) {
                if (cseen[c]) {
                    vany = true;
                    vrlo = Math.min(vrlo, colLo[c]);
                    vrhi = Math.max(vrhi, colHi[c]);
                    vclo = Math.min(vclo, c);
                    vchi = Math.max(vchi, c);
                }
                vAny[c] = vany;
                vRlo[c] = vrlo;
                vRhi[c] = vrhi;
                vClo[c] = vclo;
                vChi[c] = vchi;
            }
            let lrlo = m;
            let lrhi = -1;
            let lclo = n;
            let lchi = -1;
            let lany = false;
            for (let j = 0; j + 1 < n; ++j) {
                if (cseen[j]) {
                    lany = true;
                    lrlo = Math.min(lrlo, colLo[j]);
                    lrhi = Math.max(lrhi, colHi[j]);
                    lclo = Math.min(lclo, j);
                    lchi = Math.max(lchi, j);
                }
                if (lany && vAny[j + 1]) {
                    const cand =
                        (lrhi - lrlo + 1) * (lchi - lclo + 1) +
                        (vRhi[j + 1] - vRlo[j + 1] + 1) * (vChi[j + 1] - vClo[j + 1] + 1);
                    inner = Math.min(inner, cand);
                }
            }

            if (inner < INF) best = Math.min(best, topArea + inner);
        }
        g = rotate(g);
    }
    // At least three 1's guarantee some valid partition exists.
    return best;
};

// 90-degree clockwise rotation.
function rotate(g) {
    const m = g.length;
    const n = g[0].length;
    const out = [];
    for (let i = 0; i < n; ++i) {
        const row = new Array(m);
        for (let j = 0; j < m; ++j) row[j] = g[m - 1 - j][i];
        out.push(row);
    }
    return out;
}
