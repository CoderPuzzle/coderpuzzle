function maxProduct(nums: number[]): number {
    let first = 0;
    let second = 0;
    for (const value of nums) {
        if (value > first) {
            second = first;
            first = value;
        } else if (value > second) {
            second = value;
        }
    }
    return (first - 1) * (second - 1);
}
