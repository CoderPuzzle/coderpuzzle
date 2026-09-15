function findMatrix(nums: number[]): number[][] {
    // A value's k-th occurrence (counted from zero) always belongs to row
    // k: each row must hold distinct elements, so earlier copies can only
    // have occupied strictly earlier rows. Appending there therefore never
    // duplicates within a row, the rows stay minimal because one opens only
    // when a repeat forces a deeper level, and scanning in input order
    // keeps the construction fully deterministic.
    const seen = new Map<number, number>();
    const rows: number[][] = [];
    for (const value of nums) {
        const rank = seen.get(value) ?? 0;
        seen.set(value, rank + 1);
        if (rank === rows.length) rows.push([]);
        rows[rank].push(value);
    }
    return rows;
}
