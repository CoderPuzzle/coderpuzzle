function maximumSum(nums: number[]): number {
    const bestByDigitSum = new Map<number, number>();
    let answer = -1;
    for (const num of nums) {
        let digitSum = 0;
        for (let value = num; value > 0; value = Math.floor(value / 10)) {
            digitSum += value % 10;
        }
        if (bestByDigitSum.has(digitSum)) {
            const best = bestByDigitSum.get(digitSum)!;
            answer = Math.max(answer, best + num);
            bestByDigitSum.set(digitSum, Math.max(best, num));
        } else {
            bestByDigitSum.set(digitSum, num);
        }
    }
    return answer;
}
