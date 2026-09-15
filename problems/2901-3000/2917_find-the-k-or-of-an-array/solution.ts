function findKOr(nums: number[], k: number): number {
    // Inputs are < 2^31, so only bit positions 0..30 can ever appear and
    // the result stays a non-negative 32-bit integer.
    let result = 0;
    for (let bit = 0; bit < 31; ++bit) {
        // Count the elements carrying this bit; k or more set it.
        let count = 0;
        for (const num of nums) {
            count += (num >> bit) & 1;
        }
        if (count >= k) {
            result |= 1 << bit;
        }
    }
    return result;
}
