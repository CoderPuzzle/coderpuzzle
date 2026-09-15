function maxSum(nums: number[]): number {
    const bestByLargestDigit = new Map<number, number>();
    let answer = -1;
    for (const num of nums) {
        let largestDigit = 0;
        for (let value = num; value > 0; value = Math.floor(value / 10)) {
            largestDigit = Math.max(largestDigit, value % 10);
        }
        if (bestByLargestDigit.has(largestDigit)) {
            const best = bestByLargestDigit.get(largestDigit)!;
            answer = Math.max(answer, best + num);
            bestByLargestDigit.set(largestDigit, Math.max(best, num));
        } else {
            bestByLargestDigit.set(largestDigit, num);
        }
    }
    return answer;
}
