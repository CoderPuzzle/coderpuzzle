impl Solution {
    pub fn maximum_gap(nums: Vec<i32>) -> i32 {
        if nums.len() < 2 {
            // No pair of successive elements exists.
            return 0;
        }
        let mut lo = nums[0];
        let mut hi = nums[0];
        for &value in &nums {
            lo = lo.min(value);
            hi = hi.max(value);
        }
        if lo == hi {
            // Equal extremes mean every value is identical: all gaps are 0.
            return 0;
        }
        let count = nums.len() as i32 - 1;
        // Bucket width ceil(span/count): the average sorted gap is
        // span/count, so the maximum gap — an integer — is at least this
        // wide, and no gap inside a single bucket (spread <= width - 1)
        // can be the answer.
        let width = (hi - lo + count - 1) / count;
        let mut bucket_min = vec![0; (count + 1) as usize];
        let mut bucket_max = vec![0; (count + 1) as usize];
        let mut used = vec![false; (count + 1) as usize];
        for &value in &nums {
            // Pure division into [lo, hi] — lo lands in bucket 0, hi in
            // bucket count at most, and no multiplication can overflow.
            let index = ((value - lo) / width) as usize;
            if !used[index] || value < bucket_min[index] {
                bucket_min[index] = value;
            }
            if !used[index] || value > bucket_max[index] {
                bucket_max[index] = value;
            }
            used[index] = true;
        }
        let mut best = 0;
        // Bucket 0 holds lo, so it is never empty.
        let mut previous_max = bucket_max[0];
        for index in 1..=count as usize {
            if !used[index] {
                // Empty bucket: the measured jump only grows wider, and
                // the neighbours are successive in sorted order.
                continue;
            }
            best = best.max(bucket_min[index] - previous_max);
            previous_max = bucket_max[index];
        }
        best
    }
}
