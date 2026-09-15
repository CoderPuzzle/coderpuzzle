function minInteger(num: string, k: number): string {
    const n = num.length;
    // Fenwick tree over 1..n; tree[p] = 1 means the digit originally at
    // position p is still unplaced. Prefix sums answer "how many unplaced
    // digits sit before position p" in O(log n).
    const tree: number[] = new Array(n + 1).fill(0);
    const update = (i: number, delta: number): void => {
        for (; i <= n; i += i & -i) {
            tree[i] += delta;
        }
    };
    const query = (i: number): number => {
        let total = 0;
        for (; i > 0; i -= i & -i) {
            total += tree[i];
        }
        return total;
    };
    for (let i = 1; i <= n; i++) {
        update(i, 1);
    }

    // Per-digit queues of remaining original (1-indexed) positions, in
    // increasing order, so the front is always the cheapest to reach.
    const positions: number[][] = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < n; i++) {
        positions[num.charCodeAt(i) - 48].push(i + 1);
    }
    const heads: number[] = new Array(10).fill(0);

    let result = "";
    for (let step = 0; step < n; step++) {
        for (let d = 0; d < 10; d++) {
            if (heads[d] >= positions[d].length) {
                continue;
            }
            const p = positions[d][heads[d]];
            // Cost to bring this digit to the front of the unplaced
            // suffix: one swap per still-active digit before it.
            const cost = query(p - 1);
            if (cost <= k) {
                heads[d]++;
                update(p, -1);
                k -= cost;
                result += String.fromCharCode(48 + d);
                break;
            }
        }
    }
    return result;
}
