/**
 * @param {string} s
 * @param {string} p
 * @return {number}
 */
var shortestMatchingSubstring = function (s, p) {
    const findAll = (str, pat) => {
        const result = [];
        let start = 0;
        for (;;) {
            const idx = str.indexOf(pat, start);
            if (idx === -1) break;
            result.push(idx);
            start = idx + 1;
        }
        return result;
    };
    // bisect_right(arr, target): first index with arr[i] > target
    const bisectRight = (arr, target) => {
        let lo = 0,
            hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };

    const parts = p.split("*");
    const a = parts[0],
        b = parts[1],
        c = parts[2];
    const occA = a ? findAll(s, a) : [];
    const occB = b ? findAll(s, b) : [];
    const occC = c ? findAll(s, c) : [];

    const segs = [];
    if (a) segs.push([a.length, occA]);
    if (b) segs.push([b.length, occB]);
    if (c) segs.push([c.length, occC]);

    if (segs.length === 0) return 0;
    if (segs.length === 1) {
        const [ln, occ] = segs[0];
        return occ.length > 0 ? ln : -1;
    }
    if (segs.length === 2) {
        const [l1, occ1] = segs[0];
        const [l2, occ2] = segs[1];
        let best = -1;
        for (const j of occ2) {
            const idx = bisectRight(occ1, j - l1) - 1;
            if (idx >= 0) {
                const cand = j + l2 - occ1[idx];
                if (best === -1 || cand < best) best = cand;
            }
        }
        return best;
    }
    // three non-empty segments
    const [l1, occ1] = segs[0];
    const [l2, occ2] = segs[1];
    const [l3, occ3] = segs[2];
    const bestIForJ = new Array(occ2.length);
    for (let t = 0; t < occ2.length; t++) {
        const j = occ2[t];
        const idx = bisectRight(occ1, j - l1) - 1;
        bestIForJ[t] = idx >= 0 ? occ1[idx] : -1;
    }
    let best = -1;
    for (const k of occ3) {
        const jIdx = bisectRight(occ2, k - l2) - 1;
        if (jIdx >= 0 && bestIForJ[jIdx] !== -1) {
            const cand = k + l3 - bestIForJ[jIdx];
            if (best === -1 || cand < best) best = cand;
        }
    }
    return best;
};
