function runningSum(nums: number[]): number[] {
    const result: number[] = [...nums];
    for (let i = 1; i < result.length; i++) {
        result[i] += result[i - 1];
    }
    return result;
}
