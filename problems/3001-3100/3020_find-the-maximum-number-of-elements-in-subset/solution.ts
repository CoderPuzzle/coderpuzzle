function maximumLength(nums: number[]): number {
    const counts = new Map<number, number>();
    for (const value of nums) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    let best = 0;
    const ones = counts.get(1);
    if (ones !== undefined) {
        // 1 squared is 1, so a run of 1s forms its own pattern: an odd
        // number is selectable; drop one when the count is even.
        best = ones % 2 === 1 ? ones : ones - 1;
    }
    for (const [value] of counts) {
        if (value === 1) continue;
        // Climb x, x^2, x^4, ... taking a pair at every level but the top,
        // which stays single. Cap 31622 is the largest base whose square
        // does not exceed the 10^9 constraint bound, so every product
        // stays far inside Number's safe-integer range.
        let length = 1;
        let current = value;
        while (current <= 31622 && counts.get(current)! >= 2) {
            const next = current * current;
            if (!counts.has(next)) break;
            length += 2;
            current = next;
        }
        best = Math.max(best, length);
    }
    return best;
}
