/**
 * @param {string[]} grid
 * @return {number}
 */
var regionsBySlashes = function (grid) {
    // Cut the square into four triangles per cell — top, right, bottom,
    // left — and let an iterative union-find glue them together: the
    // cell's own marking joins triangles inside the cell, and shared
    // edges join triangles across cell borders. Each surviving set is
    // exactly one region, so the answer is the number of distinct roots
    // among the 4*n*n triangles. Nothing recurses — find walks parent
    // links and compresses the walked path in loops.
    const n = grid.length;
    const parent = new Array(4 * n * n);
    for (let x = 0; x < parent.length; x += 1) {
        parent[x] = x;
    }
    const find = (x) => {
        let root = x;
        while (parent[root] !== root) {
            root = parent[root];
        }
        while (parent[x] !== root) {
            const next = parent[x];
            parent[x] = root;
            x = next;
        }
        return root;
    };
    const unite = (a, b) => {
        const ra = find(a);
        const rb = find(b);
        if (ra !== rb) {
            parent[ra] = rb;
        }
    };
    for (let i = 0; i < n; i += 1) {
        for (let j = 0; j < n; j += 1) {
            const base = 4 * (i * n + j);
            const ch = grid[i][j];
            // '/' joins top with left and right with bottom, '\' joins top
            // with right and bottom with left, a blank joins all.
            if (ch === " ") {
                unite(base, base + 1);
                unite(base + 1, base + 2);
                unite(base + 2, base + 3);
            } else if (ch === "/") {
                unite(base, base + 3);
                unite(base + 1, base + 2);
            } else {
                unite(base, base + 1);
                unite(base + 2, base + 3);
            }
            // The bottom triangle shares its open edge with the cell
            // below's top triangle; the right triangle with the right
            // neighbor's left triangle.
            if (i + 1 < n) {
                unite(base + 2, base + 4 * n);
            }
            if (j + 1 < n) {
                unite(base + 1, base + 4 + 3);
            }
        }
    }
    // Roots are exactly the self-parented nodes, so counting those counts
    // regions.
    let regions = 0;
    for (let x = 0; x < parent.length; x += 1) {
        if (parent[x] === x) {
            regions += 1;
        }
    }
    return regions;
};
