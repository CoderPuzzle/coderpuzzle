function maxSelectedElements(nums: number[]): number {
    nums.sort((x, y) => x - y);
    const dp = new Map<number, number>();
    let best = 0;
    for (const a of nums) {
        const up = Math.max(dp.get(a + 1) ?? 0, (dp.get(a) ?? 0) + 1);
        const stay = Math.max(dp.get(a) ?? 0, (dp.get(a - 1) ?? 0) + 1);
        dp.set(a + 1, up);
        dp.set(a, stay);
        best = Math.max(best, up, stay);
    }
    return best;
}
