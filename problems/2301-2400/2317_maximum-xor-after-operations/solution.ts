function maximumXOR(nums: number[]): number {
    let answer = 0;
    for (const value of nums) {
        answer |= value;
    }
    return answer;
}
