function countCompleteSubarrays(nums: number[]): number {
    const totalDistinct = new Set(nums).size;
    const atMost = (limit: number): number => {
        // Number of subarrays holding at most `limit` distinct values,
        // counted by right endpoint with a forward-only left boundary.
        const freq = new Map<number, number>();
        let distinct = 0;
        let left = 0;
        let count = 0;
        for (let right = 0; right < nums.length; right++) {
            const grown = (freq.get(nums[right]) ?? 0) + 1;
            freq.set(nums[right], grown);
            if (grown === 1) distinct++;
            while (distinct > limit) {
                const shrunk = (freq.get(nums[left]) ?? 0) - 1;
                freq.set(nums[left], shrunk);
                if (shrunk === 0) distinct--;
                left++;
            }
            // every start in [left, right] keeps the window within limit
            // (limit 0 shrinks every window empty, contributing nothing)
            count += right - left + 1;
        }
        return count;
    };
    // A subarray is complete exactly when it holds every distinct value of
    // the whole array: atMost(k) counts it, atMost(k - 1) does not.
    return atMost(totalDistinct) - atMost(totalDistinct - 1);
}
