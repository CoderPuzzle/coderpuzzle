function answerQueries(nums: number[], queries: number[]): number[] {
    // The longest subsequence under a sum cap uses the smallest
    // elements: sort, prefix-sum, then count prefixes <= query by
    // binary search (first index whose prefix exceeds the query).
    nums.sort((a, b) => a - b);
    for (let i = 1; i < nums.length; ++i) {
        nums[i] += nums[i - 1];
    }
    const answer: number[] = [];
    for (const q of queries) {
        let lo = 0;
        let hi = nums.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (nums[mid] <= q) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        answer.push(lo);
    }
    return answer;
}
