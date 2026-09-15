function findXSum(nums: number[], k: number, x: number): number[] {
    // n <= 50, so each window is recounted directly: one count map per
    // window, then the distinct values sorted by count descending with
    // the value itself breaking ties. Taking the first x of that order
    // keeps every distinct value when fewer than x exist, which is
    // exactly the "x-sum is the array sum" rule.
    const answer: number[] = [];
    for (let start = 0; start + k <= nums.length; ++start) {
        const counts = new Map<number, number>();
        for (let i = start; i < start + k; ++i) {
            counts.set(nums[i], (counts.get(nums[i]) ?? 0) + 1);
        }
        const top = [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)! || b - a).slice(0, x);
        let total = 0;
        for (const value of top) total += value * counts.get(value)!;
        answer.push(total);
    }
    return answer;
}
