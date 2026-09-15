function countPairs(nums: number[], low: number, high: number): number {
    function pairsLe(k: number): number {
        const BITS = 16;
        const maxNodes = nums.length * BITS + 2;
        const count = new Int32Array(maxNodes);
        const child = new Int32Array(maxNodes * 2); // 0 = none, root = 1
        let nodes = 1;
        let total = 0;
        for (const x of nums) {
            // Query the trie of previously inserted numbers.
            let node = 1;
            for (let b = BITS - 1; b >= 0 && node !== 0; b--) {
                const xb = (x >>> b) & 1;
                if ((k >>> b) & 1) {
                    const c = child[node * 2 + xb];
                    if (c !== 0) {
                        total += count[c];
                    }
                    node = child[node * 2 + (1 - xb)];
                } else {
                    node = child[node * 2 + xb];
                }
            }
            if (node !== 0) {
                total += count[node];
            }
            // Insert x.
            count[1] += 1;
            node = 1;
            for (let b = BITS - 1; b >= 0; b--) {
                const d = (x >>> b) & 1;
                let nxt = child[node * 2 + d];
                if (nxt === 0) {
                    nodes += 1;
                    nxt = nodes;
                    child[node * 2 + d] = nxt;
                }
                node = nxt;
                count[node] += 1;
            }
        }
        return total;
    }
    const below = low > 0 ? pairsLe(low - 1) : 0;
    return pairsLe(high) - below;
}
