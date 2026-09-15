// State: best score for a prefix plus the lexicographically smallest
// ascending index tuple achieving it (at most four picks).
interface State {
    score: number;
    slots: number[];
    len: number;
}

function lessTup(a: State, b: State): boolean {
    for (let t = 0; t < 4; ++t) {
        const va = t < a.len ? a.slots[t] : -1;
        const vb = t < b.len ? b.slots[t] : -1;
        if (va !== vb) return va < vb;
    }
    return false;
}

function maximumWeight(intervals: number[][]): number[] {
    const n = intervals.length;
    // Sort by right endpoint: every pick set is a chain in this order, and
    // sharing any point (even one boundary) means overlapping, so
    // predecessors must end strictly left of the current left end.
    const order = intervals
        .map((_, t) => t)
        .sort((a, b) => intervals[a][1] - intervals[b][1] || intervals[a][0] - intervals[b][0]);
    const rights = order.map((t) => intervals[t][1]);

    const NEG = -(2 ** 62);
    // Layer k: over prefix length i, best score picking exactly k of the
    // first i sorted intervals.
    const make = (): State => ({ score: 0, slots: [0, 0, 0, 0], len: 0 });
    let prev: State[] = new Array(n + 1).fill(null).map(make);
    let cur: State[] = new Array(n + 1).fill(null).map(make);
    const best: (State | null)[] = [null];
    for (let k = 1; k <= 4; ++k) {
        cur[0] = { score: NEG, slots: [0, 0, 0, 0], len: 0 };
        for (let i = 1; i <= n; ++i) {
            // Share (never mutate) state objects: best[k] keeps a
            // reference into this layer, so updates must re-point slots.
            cur[i] = cur[i - 1];
            const idx = order[i - 1];
            const left = intervals[idx][0];
            const weight = intervals[idx][2];
            // Predecessors end strictly left of `left`.
            let lo = 0;
            let hi = n;
            while (lo < hi) {
                const mid = (lo + hi) >> 1;
                if (rights[mid] < left) lo = mid + 1;
                else hi = mid;
            }
            if (prev[lo].score > NEG / 4) {
                const candScore = prev[lo].score + weight;
                const cand: State = { score: candScore, slots: prev[lo].slots.slice(), len: prev[lo].len };
                let pos = cand.len;
                while (pos > 0 && cand.slots[pos - 1] > idx) --pos;
                for (let t = cand.len; t > pos; --t) cand.slots[t] = cand.slots[t - 1];
                cand.slots[pos] = idx;
                cand.len += 1;
                // Score first; on a tie the smaller index tuple wins.
                if (candScore > cur[i].score || (candScore === cur[i].score && lessTup(cand, cur[i]))) {
                    cur[i] = cand;
                }
            }
        }
        best.push(cur[n]);
        [prev, cur] = [cur, prev];
    }

    let top = NEG;
    for (let k = 1; k <= 4; ++k) top = Math.max(top, best[k]!.score);
    let winner: State | null = null;
    for (let k = 1; k <= 4; ++k) {
        if (best[k]!.score === top && (winner === null || lessTup(best[k]!, winner))) winner = best[k];
    }
    return winner!.slots.slice(0, winner!.len);
}
