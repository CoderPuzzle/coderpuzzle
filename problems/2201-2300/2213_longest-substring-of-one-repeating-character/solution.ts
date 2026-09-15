function longestRepeating(s: string, queryCharacters: string, queryIndices: number[]): number[] {
    const n = s.length;
    if (n === 0) return [];

    // per-node summary: uniform prefix/suffix runs, best run, boundary chars
    const pref: number[] = new Array(4 * n).fill(0);
    const suf: number[] = new Array(4 * n).fill(0);
    const best: number[] = new Array(4 * n).fill(0);
    const segLen: number[] = new Array(4 * n).fill(0);
    const leftChar: string[] = new Array(4 * n).fill("");
    const rightChar: string[] = new Array(4 * n).fill("");
    const chars: string[] = s.split("");

    const pull = (node: number): void => {
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

    const build = (node: number, lo: number, hi: number): void => {
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

    const update = (node: number, lo: number, hi: number, pos: number, ch: string): void => {
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
    const result: number[] = [];
    for (let i = 0; i < queryIndices.length; i++) {
        update(1, 0, n - 1, queryIndices[i], queryCharacters[i]);
        // the root's best is the answer after each point update
        result.push(best[1]);
    }
    return result;
}
