function sumDigitDifferences(nums: number[]): number {
    const n = nums.length;
    let total = 0;
    let place = 1;
    while (Math.floor(nums[0] / place) > 0) {
        const counts = new Array(10).fill(0);
        for (const num of nums) {
            counts[Math.floor(num / place) % 10]++;
        }
        let pairs = 0;
        for (const count of counts) {
            pairs += count * (n - count);
        }
        total += pairs / 2;
        place *= 10;
    }
    return total;
}
