function maximumSumSubsequence(nums: number[], queries: number[][]): number {
    const MOD = 1000000007;
    const NEG = -Infinity;
    const n = nums.length;
    // tree[node] = [m00, m01, m10, m11]: [i][j] with i = leftmost taken?,
    // j = rightmost taken? -Infinity arithmetic is exact in JS doubles
    const tree: number[][] = new Array(4 * n);

    function leaf(x: number): number[] {
        return [0, NEG, NEG, x];
    }

    function merge(left: number[], right: number[]): number[] {
        const out = [NEG, NEG, NEG, NEG];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let b = NEG;
                for (let k = 0; k < 2; k++) {
                    for (let l = 0; l < 2; l++) {
                        if (k === 1 && l === 1) continue;
                        const val = left[i * 2 + k] + right[l * 2 + j];
                        if (val > b) b = val;
                    }
                }
                out[i * 2 + j] = b;
            }
        }
        return out;
    }

    function build(node: number, lo: number, hi: number): void {
        if (hi - lo === 1) {
            tree[node] = leaf(nums[lo]);
            return;
        }
        const mid = Math.floor((lo + hi) / 2);
        build(node * 2, lo, mid);
        build(node * 2 + 1, mid, hi);
        tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);
    }

    function update(node: number, lo: number, hi: number, pos: number, val: number): void {
        if (hi - lo === 1) {
            tree[node] = leaf(val);
            return;
        }
        const mid = Math.floor((lo + hi) / 2);
        if (pos < mid) {
            update(node * 2, lo, mid, pos, val);
        } else {
            update(node * 2 + 1, mid, hi, pos, val);
        }
        tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);
    }

    build(1, 0, n);
    let answer = 0;
    for (const [pos, val] of queries) {
        update(1, 0, n, pos, val);
        const root = tree[1];
        let best = root[0];
        if (root[1] > best) best = root[1];
        if (root[2] > best) best = root[2];
        if (root[3] > best) best = root[3];
        answer = (answer + best) % MOD;
    }
    return answer;
}
