function findLonely(nums: number[]): number[] {
    // A lonely value appears exactly once and has neither neighbour
    // x - 1 nor x + 1 present; scanning nums in order keeps the output
    // in first-occurrence order.
    const count = new Map<number, number>();
    for (const x of nums) {
        count.set(x, (count.get(x) || 0) + 1);
    }
    const lonely: number[] = [];
    for (const x of nums) {
        if (count.get(x) === 1 && !count.has(x - 1) && !count.has(x + 1)) {
            lonely.push(x);
        }
    }
    return lonely;
}
