function minAdjacentSwaps(nums: number[], a: number, b: number): number {
    const modulus = 1000000007;
    const counts = [0, 0, 0];
    let answer = 0;
    for (const value of nums) {
        const group = value < a ? 0 : value <= b ? 1 : 2;
        if (group === 0) answer += counts[1] + counts[2];
        else if (group === 1) answer += counts[2];
        counts[group]++;
    }
    return answer % modulus;
}
