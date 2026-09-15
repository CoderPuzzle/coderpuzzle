impl Solution {
    // The operation is forced: merge the minimum-sum adjacent pair,
    // leftmost on ties, until the array is non-decreasing. Just simulate
    // -- with n <= 50 a full rescan per step is trivial.
    pub fn minimum_pair_removal(nums: Vec<i32>) -> i32 {
        let mut arr = nums;
        let mut ops = 0;
        loop {
            let sorted = (1..arr.len()).all(|i| arr[i - 1] <= arr[i]);
            if sorted {
                return ops;
            }
            let mut best = 0;
            for i in 1..arr.len() - 1 {
                if arr[i] + arr[i + 1] < arr[best] + arr[best + 1] {
                    best = i;
                }
            }
            // strict < keeps the earliest of equal-sum pairs
            arr[best] += arr[best + 1];
            arr.remove(best + 1);
            ops += 1;
        }
    }
}
