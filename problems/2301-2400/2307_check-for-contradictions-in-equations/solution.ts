function checkContradictions(equations: string[][], values: number[]): boolean {
    const EPS = 1e-5;
    const id = new Map<string, number>();
    const parent: number[] = [];
    const weight: number[] = [];

    function getId(s: string): number {
        if (!id.has(s)) {
            id.set(s, parent.length);
            parent.push(parent.length);
            weight.push(1.0);
        }
        return id.get(s)!;
    }

    function find(x: number): [number, number] {
        if (parent[x] === x) return [x, 1.0];
        const [root, w] = find(parent[x]);
        parent[x] = root;
        weight[x] *= w;
        return [root, weight[x]];
    }

    for (let i = 0; i < equations.length; i++) {
        const a = getId(equations[i][0]);
        const b = getId(equations[i][1]);
        const w = values[i];
        const [rootA, wa] = find(a);
        const [rootB, wb] = find(b);
        if (rootA === rootB) {
            if (Math.abs(wa / wb - w) > EPS) return true;
        } else {
            parent[rootA] = rootB;
            weight[rootA] = (wb * w) / wa;
        }
    }
    return false;
}
