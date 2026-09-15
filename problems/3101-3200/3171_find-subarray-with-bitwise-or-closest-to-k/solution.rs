impl Solution {
    pub fn minimum_difference(nums: Vec<i32>, k: i32) -> i32 {
        // Seed from the first element so single-element subarrays are covered.
        let mut best = (nums[0] - k).abs();
        // Empty-subarray seed: 0 | v = v lets the first build produce {v}.
        let mut current: Vec<i32> = vec![0];
        // OR never clears bits, so the nested frontier holds at most ~31 values.
        for &value in &nums {
            // New frontier: {value} plus every previous OR extended by value.
            let mut nxt: Vec<i32> = vec![value];
            for &prev in &current {
                nxt.push(prev | value);
            }
            nxt.sort_unstable();
            nxt.dedup();
            current = nxt;
            for &x in &current {
                let diff = (x - k).abs();
                if diff < best {
                    best = diff;
                }
            }
        }
        best
    }
}
