function deleteAndEarn(nums: number[]): number {
    // Deleting one copy of v removes its neighbors for free, so a strategy
    // just picks distinct values, earning v * count[v] each — house-robber
    // over the sorted distinct values.
    const count = new Map<number, number>();
    for (const v of nums) {
        count.set(v, (count.get(v) || 0) + 1);
    }
    const values = Array.from(count.keys()).sort((a, b) => a - b);
    let take = 0,
        skip = 0;
    let prev: number | null = null;
    for (const value of values) {
        // Adjacent predecessor conflicts with its take; a gap (missing v-1)
        // makes taking v conflict with nothing, so both states carry in.
        const base = prev !== null && prev === value - 1 ? skip : Math.max(take, skip);
        const newTake = base + value * count.get(value)!;
        const newSkip = Math.max(take, skip);
        take = newTake;
        skip = newSkip;
        prev = value;
    }
    return Math.max(take, skip);
}
