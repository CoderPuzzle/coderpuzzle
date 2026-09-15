/**
 * @param {number[][]} points
 * @return {number}
 */
var maxActivated = function (points) {
    // Union every pair of points sharing an x or a y coordinate; the
    // activation closure of any point is its component, and a new point
    // touches at most two components, so join the two largest (or all, when
    // there is a single component).
    const n = points.length;
    const parent = Array.from({ length: n }, (_, i) => i);
    const size = new Array(n).fill(1);
    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    const unite = (a, b) => {
        let ra = find(a);
        let rb = find(b);
        if (ra === rb) {
            return;
        }
        if (size[ra] < size[rb]) {
            [ra, rb] = [rb, ra];
        }
        parent[rb] = ra;
        size[ra] += size[rb];
    };
    const xmap = new Map();
    const ymap = new Map();
    for (let i = 0; i < n; i++) {
        const [x, y] = points[i];
        if (xmap.has(x)) {
            unite(i, xmap.get(x));
        } else {
            xmap.set(x, i);
        }
        if (ymap.has(y)) {
            unite(i, ymap.get(y));
        } else {
            ymap.set(y, i);
        }
    }
    const comp = new Map();
    for (let i = 0; i < n; i++) {
        const r = find(i);
        comp.set(r, (comp.get(r) || 0) + 1);
    }
    let first = 0;
    let second = 0;
    for (const value of comp.values()) {
        if (value > first) {
            second = first;
            first = value;
        } else if (value > second) {
            second = value;
        }
    }
    if (comp.size === 1) {
        return n + 1;
    }
    return first + second + 1;
};
