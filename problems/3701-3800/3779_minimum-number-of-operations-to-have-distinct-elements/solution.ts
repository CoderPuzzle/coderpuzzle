function minOperations(nums: number[]): number {
    // Pointer + counts: counts tracks the remaining suffix, duplicated
    // how many distinct values it still holds twice or more. While the
    // suffix has a duplicate, one operation advances the pointer by three
    // and refreshes only those three values (the last, possibly shorter,
    // operation removes whatever is left).
    const counts = new Map<number, number>();
    for (const v of nums) {
        counts.set(v, (counts.get(v) || 0) + 1);
    }
    let duplicated = 0;
    for (const c of counts.values()) {
        if (c >= 2) duplicated++;
    }
    let i = 0;
    let ops = 0;
    const n = nums.length;
    while (i < n && duplicated > 0) {
        for (let j = i; j < Math.min(i + 3, n); j++) {
            const c = (counts.get(nums[j]) as number) - 1;
            counts.set(nums[j], c);
            if (c === 1) duplicated--;
        }
        i += 3;
        ops++;
    }
    return ops;
}
