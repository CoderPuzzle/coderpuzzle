/**
 * @param {string} s
 * @param {string} queryCharacters
 * @param {number[]} queryIndices
 * @return {number[]}
 */
var longestRepeating = function (s, queryCharacters, queryIndices) {
    const n = s.length;
    if (n === 0) return [];

    // per-node summary: uniform prefix/suffix runs, best run, boundary chars
    const pref = new Array(4 * n).fill(0);
    const suf = new Array(4 * n).fill(0);
    const best = new Array(4 * n).fill(0);
    const segLen = new Array(4 * n).fill(0);
    const leftChar = new Array(4 * n).fill("");
    const rightChar = new Array(4 * n).fill("");
    const chars = s.split("");

    const pull = (node) => {
        const l = 2 * node,
            r = 2 * node + 1;
        segLen[node] = segLen[l] + segLen[r];
        leftChar[node] = leftChar[l];
        rightChar[node] = rightChar[r];
        // prefix spans into the right child only if the left child is one
        // whole run and the boundary characters agree
        if (pref[l] === segLen[l] && leftChar[l] === leftChar[r]) {
            pref[node] = pref[l] + pref[r];
        } else {
            pref[node] = pref[l];
        }
        if (suf[r] === segLen[r] && rightChar[r] === rightChar[l]) {
            suf[node] = suf[r] + suf[l];
        } else {
            suf[node] = suf[r];
        }
        // a run may straddle the child boundary when the boundary chars agree
        const joined = rightChar[l] === leftChar[r] ? suf[l] + pref[r] : 0;
        best[node] = Math.max(best[l], best[r], joined);
    };

    const build = (node, lo, hi) => {
        if (lo === hi) {
            // a leaf is the trivial summary: a single run of length 1
            pref[node] = suf[node] = best[node] = 1;
            segLen[node] = 1;
            leftChar[node] = rightChar[node] = chars[lo];
            return;
        }
        const mid = (lo + hi) >> 1;
        build(2 * node, lo, mid);
        build(2 * node + 1, mid + 1, hi);
        pull(node);
    };

    const update = (node, lo, hi, pos, ch) => {
        if (lo === hi) {
            chars[pos] = ch;
            leftChar[node] = rightChar[node] = ch;
            return;
        }
        const mid = (lo + hi) >> 1;
        if (pos <= mid) {
            update(2 * node, lo, mid, pos, ch);
        } else {
            update(2 * node + 1, mid + 1, hi, pos, ch);
        }
        // recompute the O(log n) nodes on the path back to the root
        pull(node);
    };

    build(1, 0, n - 1);
    const result = [];
    for (let i = 0; i < queryIndices.length; i++) {
        update(1, 0, n - 1, queryIndices[i], queryCharacters[i]);
        // the root's best is the answer after each point update
        result.push(best[1]);
    }
    return result;
};
