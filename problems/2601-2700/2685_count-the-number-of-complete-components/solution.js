/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countCompleteComponents = function (n, edges) {
    const parent = Array.from({ length: n }, (_, i) => i);
    const size = new Array(n).fill(1);

    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };

    for (const [a, b] of edges) {
        const ra = find(a);
        const rb = find(b);
        if (ra !== rb) {
            let big = ra;
            let small = rb;
            if (size[big] < size[small]) {
                big = rb;
                small = ra;
            }
            parent[small] = big;
            size[big] += size[small];
        }
    }

    const edgeCount = new Array(n).fill(0);
    for (const [a] of edges) {
        edgeCount[find(a)]++;
    }

    let complete = 0;
    for (let v = 0; v < n; v++) {
        if (find(v) === v && edgeCount[v] === (size[v] * (size[v] - 1)) / 2) {
            complete++;
        }
    }
    return complete;
};
