function maximumTotalDamage(power: number[]): number {
    // Copies of equal damage act as one all-or-nothing group worth
    // count * v (casting any copy already bans the rest of that value).
    // Sort unique damages ascending and run a forward take/skip DP where
    // taking v requires predecessors <= v - 3, tracked by a monotone left
    // pointer. Totals reach 10^14 at the bounds — exact, since Numbers
    // hold integers precisely up to 2^53.
    const totals = new Map<number, number>();
    for (const value of power) {
        totals.set(value, (totals.get(value) || 0) + value);
    }
    const values = [...totals.keys()].sort((a, b) => a - b);
    const m = values.length;
    const best = new Array(m).fill(0);
    let left = 0;
    for (let j = 0; j < m; j++) {
        const v = values[j];
        while (values[left] <= v - 3) {
            left++;
        }
        const take = totals.get(v)! + (left ? best[left - 1] : 0);
        const skip = j ? best[j - 1] : 0;
        best[j] = Math.max(skip, take);
    }
    return best[m - 1];
}
