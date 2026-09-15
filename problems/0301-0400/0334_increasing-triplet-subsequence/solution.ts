function increasingTriplet(nums: number[]): boolean {
    let first = Infinity;
    let second = Infinity;
    for (const value of nums) {
        if (value <= first) {
            first = value;
        } else if (value <= second) {
            second = value;
        } else {
            return true;
        }
    }
    return false;
}
