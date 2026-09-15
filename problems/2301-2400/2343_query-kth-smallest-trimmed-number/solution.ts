function smallestTrimmedNumbers(nums: string[], queries: number[][]): number[] {
    // All strings share one length, so trimmed suffixes do too, and
    // lexicographic order on equal-length digit strings equals numeric
    // order — no numeric conversion needed (suffixes can exceed Number's
    // safe integer range).
    const answer: number[] = [];
    const order = nums.map((_, index) => index);
    for (const [k, trim] of queries) {
        order.sort((left, right) => {
            const a = nums[left].slice(-trim);
            const b = nums[right].slice(-trim);
            if (a !== b) return a < b ? -1 : 1;
            return left - right;
        });
        answer.push(order[k - 1]);
    }
    return answer;
}
