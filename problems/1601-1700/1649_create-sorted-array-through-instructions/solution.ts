function createSortedArray(instructions: number[]): number {
    const MOD = 1000000007;
    let m = 0;
    for (const x of instructions) {
        if (x > m) {
            m = x;
        }
    }
    // Fenwick tree indexed by value: prefix counts with point updates.
    const tree: number[] = new Array(m + 1).fill(0);

    // Climb the lowbit ladder to add one occurrence of value i.
    const update = (i: number): void => {
        while (i <= m) {
            tree[i] += 1;
            i += i & -i;
        }
    };

    // Sum of occurrences of values 1..i.
    const query = (i: number): number => {
        let s = 0;
        while (i > 0) {
            s += tree[i];
            i -= i & -i;
        }
        return s;
    };

    let total = 0;
    let count = 0;
    for (const x of instructions) {
        // Inserting x costs the smaller of: elements strictly below x
        // (query(x-1)) and strictly above (count - query(x), since
        // query(x) includes equals — equals land in neither bucket).
        const less = query(x - 1);
        const greater = count - query(x);
        total = (total + Math.min(less, greater)) % MOD;
        update(x);
        count += 1;
    }
    return total;
}
