// Track the most recent 1 and most recent 2 seen so far; the closest
// 1/2 pair is always caught the moment its second element is scanned.
function minAbsoluteDifference(nums: number[]): number {
    let lastOne = -1;
    let lastTwo = -1;
    let best = -1;
    for (let index = 0; index < nums.length; ++index) {
        const value = nums[index];
        if (value === 1) {
            if (lastTwo !== -1) {
                const distance = index - lastTwo;
                if (best === -1 || distance < best) best = distance;
            }
            lastOne = index;
        } else if (value === 2) {
            if (lastOne !== -1) {
                const distance = index - lastOne;
                if (best === -1 || distance < best) best = distance;
            }
            lastTwo = index;
        }
    }
    return best;
}
