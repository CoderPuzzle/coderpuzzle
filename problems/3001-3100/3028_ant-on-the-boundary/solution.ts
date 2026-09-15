function returnToBoundaryCount(nums: number[]): number {
    let position = 0;
    let returns = 0;
    for (const num of nums) {
        position += num;
        if (position === 0) {
            returns++;
        }
    }
    return returns;
}
