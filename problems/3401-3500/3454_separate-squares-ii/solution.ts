function separateSquares(squares: number[][]): number {
    const n = squares.length;
    // compressed x-coordinates (square left and right edges)
    const xs: number[] = [];
    for (const sq of squares) {
        xs.push(sq[0], sq[0] + sq[2]);
    }
    xs.sort((a, b) => a - b);
    const unique: number[] = [];
    for (const v of xs) {
        if (unique.length === 0 || unique[unique.length - 1] !== v) unique.push(v);
    }
    const m = unique.length;
    const index = new Map<number, number>();
    for (let i = 0; i < m; i++) {
        index.set(unique[i], i);
    }

    // y-sweep events: square bottom (+1) and top (-1)
    const events: number[][] = [];
    for (const sq of squares) {
        const x = sq[0];
        const y = sq[1];
        const l = sq[2];
        events.push([y, x, x + l, 1]);
        events.push([y + l, x, x + l, -1]);
    }
    events.sort((a, b) => a[0] - b[0]);

    const count: number[] = new Array(4 * m).fill(0);
    const cover: number[] = new Array(4 * m).fill(0);
    // exact integer arithmetic throughout (values stay below 2^53)
    const update = (node: number, lo: number, hi: number, i: number, j: number, delta: number): void => {
        if (j <= lo || hi <= i) return;
        if (i <= lo && hi <= j) {
            count[node] += delta;
        } else {
            const mid = (lo + hi) >> 1;
            update(2 * node, lo, mid, i, j, delta);
            update(2 * node + 1, mid, hi, i, j, delta);
        }
        if (count[node] > 0) {
            cover[node] = unique[hi] - unique[lo];
        } else if (hi - lo === 1) {
            cover[node] = 0;
        } else {
            cover[node] = cover[2 * node] + cover[2 * node + 1];
        }
    };

    // Pass 1: record every positive-width band and accumulate the total
    // covered (union) area — exact integer arithmetic throughout.
    const bands: number[][] = []; // [y0, y1, width, areaBefore]
    let total = 0;
    let k = 0;
    while (k < events.length) {
        const y = events[k][0];
        while (k < events.length && events[k][0] === y) {
            const ev = events[k];
            update(1, 0, m - 1, index.get(ev[1])!, index.get(ev[2])!, ev[3]);
            k++;
        }
        if (k < events.length) {
            const width = cover[1];
            if (width > 0) {
                const y1 = events[k][0];
                bands.push([y, y1, width, total]);
                total += width * (y1 - y);
            }
        }
    }

    // Pass 2: the first band whose end reaches half of the total contains
    // the balance line; only here do we divide.
    let area = 0;
    for (const [y0, y1, width] of bands) {
        const after = area + width * (y1 - y0);
        if (2 * after >= total) {
            return y0 + (total - 2 * area) / (2.0 * width);
        }
        area = after;
    }
    return 0.0; // unreachable: at least one square covers positive area
}
