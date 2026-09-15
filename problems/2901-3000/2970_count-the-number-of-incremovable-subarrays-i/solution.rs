impl Solution {
    pub fn incremovable_subarray_count(nums: Vec<i32>) -> i32 {
        // A subarray (i, j) is incremovable exactly when splicing it out
        // leaves a strictly increasing sequence. n <= 50, so every one of
        // the O(n^2) subarrays is checked directly: walk the surviving
        // elements (prefix nums[:i] then suffix nums[j+1:]) and require
        // each one to exceed its predecessor; values are positive, so a
        // sentinel of 0 seeds the comparison.
        let n = nums.len();
        let mut count = 0i32;
        for i in 0..n {
            for j in i..n {
                let mut ok = true;
                let mut prev = 0i32;
                for idx in 0..n {
                    if idx >= i && idx <= j {
                        continue;
                    }
                    if nums[idx] <= prev {
                        ok = false;
                        break;
                    }
                    prev = nums[idx];
                }
                if ok {
                    count += 1;
                }
            }
        }
        count
    }
}
