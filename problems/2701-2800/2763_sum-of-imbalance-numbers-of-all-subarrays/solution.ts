function sumImbalanceNumbers(nums: number[]): number {
    const n = nums.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        // Seed with the single-element window: its imbalance is 0.
        const seen = new Array<boolean>(n + 2).fill(false);
        seen[nums[i]] = true;
        let cur = 0;
        for (let j = i + 1; j < n; j++) {
            const v = nums[j];
            if (!seen[v]) {
                const lo = seen[v - 1];
                const hi = seen[v + 1];
                if (lo && hi) {
                    cur--;
                } else if (!lo && !hi) {
                    cur++;
                }
                seen[v] = true;
            }
            total += cur;
        }
    }
    return total;
}
