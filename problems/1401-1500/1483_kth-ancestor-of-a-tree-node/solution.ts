class TreeAncestor {
    private levels: number;
    private up: number[][];

    constructor(n: number, parent: number[]) {
        let levels = 1;
        while (1 << levels <= n) {
            levels++;
        }
        this.levels = levels;
        this.up = [parent.slice()];
        for (let j = 1; j < levels; j++) {
            const previous = this.up[j - 1];
            const current: number[] = new Array(n).fill(-1);
            for (let v = 0; v < n; v++) {
                const middle = previous[v];
                if (middle >= 0) {
                    current[v] = previous[middle];
                }
            }
            this.up.push(current);
        }
    }

    getKthAncestor(node: number, k: number): number {
        if (k >= 1 << this.levels) {
            return -1;
        }
        for (let level = 0; k !== 0 && node >= 0; level++, k >>= 1) {
            if (k & 1) {
                node = this.up[level][node];
            }
        }
        return node;
    }
}
