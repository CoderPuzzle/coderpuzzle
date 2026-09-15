/**
 * @param {number} n
 * @param {number[][]} paths
 * @return {number[]}
 */
var gardenNoAdj = function (n, paths) {
    const adj = Array.from({ length: n + 1 }, () => []);
    for (const [x, y] of paths) {
        adj[x].push(y);
        adj[y].push(x);
    }

    const color = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        const used = new Set();
        for (const neighbor of adj[i]) {
            if (color[neighbor] !== 0) {
                used.add(color[neighbor]);
            }
        }
        for (let c = 1; c <= 4; c++) {
            if (!used.has(c)) {
                color[i] = c;
                break;
            }
        }
    }

    return color.slice(1);
};
