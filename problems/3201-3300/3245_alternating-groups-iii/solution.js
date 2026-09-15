/**
 * @param {number[]} colors
 * @param {number[][]} queries
 * @return {number[]}
 */
var numberOfAlternatingGroups = function (colors, queries) {
    // Edge j joins tile j and tile j + 1 circularly and is bad when its two
    // endpoints share a color. A size-k group starting at tile s spans the
    // k - 1 consecutive edges s..s+k-2, so counting size-k groups means
    // counting starting edges followed by k - 1 good edges. The bad-edge set
    // lives implicitly in a Fenwick tree of 0/1 counts whose prefix sums
    // locate predecessors and successors by descent, and the multiset of
    // good-edge runs between neighboring bad edges lives in two more trees
    // keyed by run length (one counting runs, one summing lengths); a repaint
    // toggles exactly two edges, each splitting or merging a single run.
    const n = colors.length;
    const bad = new Array(n).fill(false);
    colors = [...colors];
    const posCnt = new Array(n + 1).fill(0);
    const runCnt = new Array(n + 1).fill(0);
    const runSum = new Array(n + 1).fill(0);
    let total = 0;
    const totals = [0, 0];

    const addPos = (i, delta) => {
        i += 1;
        while (i <= n) {
            posCnt[i] += delta;
            i += i & -i;
        }
    };
    const prefixPos = (i) => {
        i += 1;
        let t = 0;
        while (i > 0) {
            t += posCnt[i];
            i -= i & -i;
        }
        return t;
    };
    const kth = (c) => {
        let pos = 0;
        for (let pw = 1 << 17; pw > 0; pw >>= 1) {
            if (pos + pw <= n && posCnt[pos + pw] < c) {
                pos += pw;
                c -= posCnt[pos];
            }
        }
        return pos;
    };
    const addRun = (fen, length, delta) => {
        length += 1;
        while (length <= n) {
            fen[length] += delta;
            length += length & -length;
        }
    };
    const prefixRun = (fen, length) => {
        length += 1;
        let t = 0;
        while (length > 0) {
            t += fen[length];
            length -= length & -length;
        }
        return t;
    };
    const cyc = (d) => ((d % n) + n) % n;
    const runsUpdate = (length, delta) => {
        if (length > 0) {
            addRun(runCnt, length, delta);
            addRun(runSum, length, delta * length);
            totals[0] += delta;
            totals[1] += delta * length;
        }
    };
    const prevBad = (e) => {
        const c = prefixPos(e - 1);
        return c > 0 ? kth(c) : kth(total);
    };
    const nextBad = (e) => {
        const c = prefixPos(e);
        return c < total ? kth(c + 1) : kth(1);
    };
    const insertEdge = (e) => {
        if (total > 0) {
            const p = prevBad(e);
            const nx = nextBad(e);
            runsUpdate(cyc(nx - p - 1), -1);
            runsUpdate(cyc(e - p - 1), 1);
            runsUpdate(cyc(nx - e - 1), 1);
        }
        addPos(e, 1);
        total += 1;
        if (total === 1) runsUpdate(n - 1, 1);
    };
    const removeEdge = (e) => {
        addPos(e, -1);
        total -= 1;
        if (total > 0) {
            const p = prevBad(e);
            const nx = nextBad(e);
            runsUpdate(cyc(e - p - 1), -1);
            runsUpdate(cyc(nx - e - 1), -1);
            runsUpdate(cyc(nx - p - 1), 1);
        } else {
            runsUpdate(n - 1, -1);
        }
    };

    for (let j = 0; j < n; j++) {
        bad[j] = colors[j] === colors[(j + 1) % n];
        if (bad[j]) insertEdge(j);
    }

    const answer = [];
    for (const query of queries) {
        if (query[0] === 1) {
            if (total === 0) {
                answer.push(n);
                continue;
            }
            const need = query[1] - 1;
            const cntGe = totals[0] - prefixRun(runCnt, need - 1);
            const sumGe = totals[1] - prefixRun(runSum, need - 1);
            answer.push(sumGe - (need - 1) * cntGe);
        } else {
            const index = query[1];
            const color = query[2];
            if (colors[index] === color) continue;
            colors[index] = color;
            for (const e of [(index + n - 1) % n, index]) {
                const isBad = colors[e] === colors[(e + 1) % n];
                if (isBad === bad[e]) continue;
                bad[e] = isBad;
                if (isBad) insertEdge(e);
                else removeEdge(e);
            }
        }
    }
    return answer;
};
