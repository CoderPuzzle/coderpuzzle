// Values are bounded to [1, 500], so a fixed counting table answers "is
// every value's occurrence count even?" in one pass.
function divideArray(nums: number[]): boolean {
    const counts = new Array<number>(501).fill(0);
    for (const value of nums) {
        counts[value]++;
    }
    for (const count of counts) {
        if (count % 2 !== 0) {
            return false;
        }
    }
    return true;
}
