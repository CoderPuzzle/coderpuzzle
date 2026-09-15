impl Solution {
    // Values fit below 2^30 (nums[i] <= 10^9) and the answer is at most
    // nums.len() <= 10^5, so i32 carries everything here. A subsequence
    // ANDs to something non-zero exactly when all of its elements share
    // at least one set bit, so for each bit keep the elements that have
    // it (order preserved) and take the longest strictly increasing
    // subsequence among them; the best bit wins.
    pub fn longest_subsequence(nums: Vec<i32>) -> i32 {
        let top = nums.iter().copied().max().unwrap_or(0);
        let mut best = 0;
        let mut b = 0;
        while top >> b > 0 {
            let mut tails: Vec<i32> = Vec::new();
            for &x in &nums {
                if x >> b & 1 == 0 {
                    continue;
                }
                // Strictly increasing: replace the first tail >= x.
                let i = tails.partition_point(|&t| t < x);
                if i == tails.len() {
                    tails.push(x);
                } else {
                    tails[i] = x;
                }
            }
            best = best.max(tails.len() as i32);
            b += 1;
        }
        best
    }
}
