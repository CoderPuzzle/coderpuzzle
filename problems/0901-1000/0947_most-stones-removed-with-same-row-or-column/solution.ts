// Stones joined by shared rows and columns split the plane into connected
// components. Inside a component of k stones any k - 1 can go: peel the
// component down to one survivor, every removal still sharing a row or
// column with a stone that remains. Stones of different components never
// share a line, so the answer is n minus the number of components —
// union-find merges each stone with the first stone registered in its row
// and in its column, and the roots count the components.
function removeStones(stones: number[][]): number {
    const n = stones.length;
    const parent: number[] = new Array(n);
    for (let i = 0; i < n; i++) parent[i] = i;
    const size: number[] = new Array(n).fill(1);

    const find = (x: number): number => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    const union = (a: number, b: number): void => {
        let ra = find(a),
            rb = find(b);
        if (ra === rb) return;
        if (size[ra] < size[rb]) {
            const t = ra;
            ra = rb;
            rb = t;
        }
        parent[rb] = ra;
        size[ra] += size[rb];
    };

    const firstInRow = new Map<number, number>();
    const firstInCol = new Map<number, number>();
    for (let i = 0; i < n; i++) {
        const x = stones[i][0];
        const y = stones[i][1];
        if (firstInRow.has(x)) union(i, firstInRow.get(x)!);
        else firstInRow.set(x, i);
        if (firstInCol.has(y)) union(i, firstInCol.get(y)!);
        else firstInCol.set(y, i);
    }

    let components = 0;
    for (let i = 0; i < n; i++) {
        if (find(i) === i) components++;
    }
    return n - components;
}
