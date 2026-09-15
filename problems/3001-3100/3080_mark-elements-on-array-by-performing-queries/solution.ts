function unmarkedSumArray(nums: number[], queries: number[][]): number[] {
    // Marking only ever removes elements, so one monotone sweep over the
    // indices sorted by (value, index) answers every query's "k smallest
    // unmarked" step: the pointer skips entries marked by name and never
    // revisits one. A running total absorbs each mark — it can reach
    // 10^5 * 10^5 = 10^10, far below 2^53, so Number arithmetic stays exact.
    const n = nums.length;
    const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => nums[a] - nums[b] || a - b);
    const marked = new Array<boolean>(n).fill(false);
    let total = 0;
    for (const num of nums) {
        total += num;
    }
    let pointer = 0;
    const answer: number[] = [];
    for (const [index, count] of queries) {
        if (!marked[index]) {
            marked[index] = true;
            total -= nums[index];
        }
        let taken = 0;
        while (taken < count && pointer < n) {
            const candidate = order[pointer];
            pointer++;
            if (marked[candidate]) {
                continue;
            }
            marked[candidate] = true;
            total -= nums[candidate];
            taken++;
        }
        answer.push(total);
    }
    return answer;
}
