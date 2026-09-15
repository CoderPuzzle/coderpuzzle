/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function (heightMap) {
    function MinHeap() {
        this.a = [];
    }
    MinHeap.prototype.size = function () {
        return this.a.length;
    };
    MinHeap.prototype.push = function (item) {
        const a = this.a;
        a.push(item);
        let i = a.length - 1;
        while (i > 0) {
            const par = (i - 1) >> 1;
            if (a[par][0] <= a[i][0]) break;
            [a[par], a[i]] = [a[i], a[par]];
            i = par;
        }
    };
    MinHeap.prototype.pop = function () {
        const a = this.a;
        const top = a[0];
        const last = a.pop();
        if (a.length > 0) {
            a[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                let m = i;
                if (l < a.length && a[l][0] < a[m][0]) m = l;
                if (r < a.length && a[r][0] < a[m][0]) m = r;
                if (m === i) break;
                [a[m], a[i]] = [a[i], a[m]];
                i = m;
            }
        }
        return top;
    };

    const m = heightMap.length,
        n = heightMap[0].length;
    const visited = Array.from({ length: m }, () => new Array(n).fill(false));
    const heap = new MinHeap();
    // Water spills off the map at the border, so the frontier starts as
    // the whole border ring.
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
                heap.push([heightMap[i][j], i, j]);
                visited[i][j] = true;
            }
        }
    }
    let water = 0;
    const dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    while (heap.size() > 0) {
        const [h, i, j] = heap.pop();
        // h is the frontier minimum: no undiscovered cell can hold water
        // above h, since any escape path crosses the frontier at >= h.
        for (const [di, dj] of dirs) {
            const ni = i + di,
                nj = j + dj;
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && !visited[ni][nj]) {
                visited[ni][nj] = true;
                const nh = heightMap[ni][nj];
                if (nh < h) {
                    // Lower neighbor settles now, filled up to level h.
                    water += h - nh;
                }
                // Push max(h, nh): entries carry the effective
                // water-plus-terrain level, the running spill level.
                heap.push([Math.max(h, nh), ni, nj]);
            }
        }
    }
    return water;
};
