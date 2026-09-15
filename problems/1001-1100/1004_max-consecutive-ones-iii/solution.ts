function longestOnes(nums: number[], k: number): number {
    // flipping <= k zeros == longest window holding <= k zeros
    // (nothing is actually flipped)
    let left = 0;
    let zeros = 0;
    let best = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) {
            zeros++;
        }
        // shrink from the left only as far as necessary — never reset —
        // so the window keeps growing across long stretches
        while (zeros > k) {
            if (nums[left] === 0) {
                zeros--;
            }
            left++;
        }
        // after the shrink this is the longest valid window ending at
        // right; each index enters and leaves the window at most once
        if (right - left + 1 > best) {
            best = right - left + 1;
        }
    }
    return best;
}
