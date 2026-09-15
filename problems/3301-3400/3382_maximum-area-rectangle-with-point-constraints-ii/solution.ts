function maxRectangleArea(xCoord: number[], yCoord: number[]): number {
    // Sweep columns right-to-left. Compress both axes; a candidate
    // rectangle's left edge is two consecutive points (in y order) of
    // one column. The nearest column to the right holding any point
    // with y in [y1, y2] is the only possible right edge: any farther
    // column would keep that nearest point inside or on the border.
    // A min segment tree over compressed y, seeded with column indices
    // as columns are passed, answers "nearest column with a point in
    // y-range [a, b]" as a range-min query. The right column must hold
    // exactly y1 and y2 inside the range (both corners, nothing
    // between or on the border).
    const n = xCoord.length;
    const xs = [...new Set(xCoord)].sort((a, b) => a - b);
    const ys = [...new Set(yCoord)].sort((a, b) => a - b);
    const xidx = new Map<number, number>();
    xs.forEach((v, i) => xidx.set(v, i));
    const yidx = new Map<number, number>();
    ys.forEach((v, i) => yidx.set(v, i));
    const order = [...Array(n).keys()].sort((i, j) => xCoord[i] - xCoord[j] || yCoord[i] - yCoord[j]);
    const cx = new Array<number>(n);
    const cy = new Array<number>(n);
    for (let p = 0; p < n; p++) {
        cx[p] = xidx.get(xCoord[order[p]]);
        cy[p] = yidx.get(yCoord[order[p]]);
    }
    const cols: number[][] = [];
    let p = 0;
    while (p < n) {
        let q = p + 1;
        while (q < n && cx[q] === cx[p]) {
            q++;
        }
        cols.push(cy.slice(p, q));
        p = q;
    }
    const m = cols.length;
    const k = ys.length;
    let size = 1;
    while (size < k) {
        size *= 2;
    }
    const INF = m;
    const tree = new Array<number>(2 * size).fill(INF);
    const update = (pos: number, val: number): void => {
        let i = pos + size;
        while (i > 0 && tree[i] > val) {
            tree[i] = val;
            i >>= 1;
        }
    };
    const query = (lo: number, hi: number): number => {
        let res = INF;
        let l = lo + size;
        let r = hi + size + 1;
        while (l < r) {
            if (l & 1) {
                if (tree[l] < res) {
                    res = tree[l];
                }
                l++;
            }
            if (r & 1) {
                r--;
                if (tree[r] < res) {
                    res = tree[r];
                }
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    };
    const lowerBound = (arr: number[], v: number): number => {
        let lo = 0;
        let hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] < v) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };
    let best = -1;
    for (let c = m - 1; c >= 0; c--) {
        const col = cols[c];
        for (let t = 0; t + 1 < col.length; t++) {
            const a = col[t];
            const b = col[t + 1];
            const r = query(a, b);
            if (r < INF) {
                const arr = cols[r];
                const lo = lowerBound(arr, a);
                const hi = lowerBound(arr, b + 1);
                if (hi - lo === 2 && arr[lo] === a && arr[lo + 1] === b) {
                    // Coordinates are at most 8e7, so every area is at most
                    // 8e7 * 8e7 = 6.4e15 < 2^53 ~ 9.0e15: each product of
                    // two integer coordinates stays below 2^53 and is an
                    // exact JS number, as is the running max comparison.
                    const area = (xs[r] - xs[c]) * (ys[b] - ys[a]);
                    if (area > best) {
                        best = area;
                    }
                }
            }
        }
        for (const yy of col) {
            update(yy, c);
        }
    }
    return best;
}
