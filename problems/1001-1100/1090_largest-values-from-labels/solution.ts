function largestValsFromLabels(values: number[], labels: number[], numWanted: number, useLimit: number): number {
    // Greedy: sort items by value descending and take each one while both
    // the per-label cap and the total count allow it.
    const n = values.length;
    const order = Array.from({ length: n }, (_, i) => i);
    order.sort((a, b) => values[b] - values[a]);
    const used = new Map<number, number>();
    let total = 0;
    let taken = 0;
    for (const idx of order) {
        if (taken === numWanted) break;
        const label = labels[idx];
        if ((used.get(label) || 0) === useLimit) continue;
        used.set(label, (used.get(label) || 0) + 1);
        total += values[idx];
        taken++;
    }
    return total;
}
