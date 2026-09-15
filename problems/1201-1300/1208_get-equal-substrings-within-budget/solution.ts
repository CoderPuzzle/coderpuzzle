function equalSubstring(s: string, t: string, maxCost: number): number {
    // cost[i] = |s[i] - t[i]|; find the longest subarray of costs whose sum
    // stays at most maxCost. A sliding window keeps one pass.
    const n = s.length;
    const costs = new Array<number>(n);
    for (let i = 0; i < n; ++i) costs[i] = Math.abs(s.charCodeAt(i) - t.charCodeAt(i));
    let left = 0;
    let windowCost = 0;
    let best = 0;
    for (let right = 0; right < n; ++right) {
        windowCost += costs[right];
        // Non-negative costs: shrink from the left until affordable.
        while (windowCost > maxCost) {
            windowCost -= costs[left++];
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}
