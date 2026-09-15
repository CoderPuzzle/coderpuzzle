/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var matrixRankTransform = function (matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    // cells sorted by (value, r, c); idx = r * n + c encodes (r, c) order.
    const cells = [];
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            cells.push([matrix[r][c], r * n + c]);
        }
    }
    cells.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));

    // Largest rank used so far in each row/column, from smaller values
    // (processing is in increasing value order, so those are final).
    const rowMax = new Array(m).fill(0);
    const colMax = new Array(n).fill(0);
    const ans = Array.from({ length: m }, () => new Array(n).fill(0));

    const parent = new Array(m * n).fill(-1);
    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    const union = (a, b) => {
        const ra = find(a),
            rb = find(b);
        if (ra !== rb) parent[rb] = ra;
    };

    let i = 0;
    const count = cells.length;
    while (i < count) {
        const value = cells[i][0];
        const group = [];
        let j = i;
        while (j < count && cells[j][0] === value) {
            group.push(cells[j][1]);
            j++;
        }

        // Fresh union-find per group, so components never leak across
        // different values. Equal values sharing a row or column are forced
        // to the same rank; unions chain through shared rows/columns.
        for (const idx of group) parent[idx] = idx;
        const byRow = new Map();
        for (const idx of group) {
            const r = Math.floor(idx / n);
            if (byRow.has(r)) {
                union(idx, byRow.get(r));
            } else {
                byRow.set(r, idx);
            }
        }
        const byCol = new Map();
        for (const idx of group) {
            const c = idx % n;
            if (byCol.has(c)) {
                union(idx, byCol.get(c));
            } else {
                byCol.set(c, idx);
            }
        }

        // Component rank = 1 + the strictest requirement over its cells;
        // that is simultaneously the smallest legal rank for all of them.
        const compRank = new Map();
        for (const idx of group) {
            const r = Math.floor(idx / n);
            const c = idx % n;
            const root = find(idx);
            const candidate = Math.max(rowMax[r], colMax[c]) + 1;
            if (!compRank.has(root) || candidate > compRank.get(root)) {
                compRank.set(root, candidate);
            }
        }

        // Assign the shared rank and refresh the row/column maxima so
        // later, larger values see it.
        for (const idx of group) {
            const r = Math.floor(idx / n);
            const c = idx % n;
            const rank = compRank.get(find(idx));
            ans[r][c] = rank;
            if (rank > rowMax[r]) rowMax[r] = rank;
            if (rank > colMax[c]) colMax[c] = rank;
        }

        i = j;
    }

    return ans;
};
