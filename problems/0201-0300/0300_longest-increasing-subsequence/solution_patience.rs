impl Solution {
    pub fn length_of_lis(nums: Vec<i32>) -> i32 {
        // tails[k] = smallest value ending an increasing subsequence of
        // length k+1; it stays sorted, which licenses the binary search.
        let mut tails: Vec<i32> = Vec::new();
        for &x in &nums {
            // First tail >= x: an equal value overwrites its own
            // tail, enforcing strict increase.
            let i = tails.partition_point(|&t| t < x);
            if i == tails.len() {
                // Bigger than every tail: x extends the best subsequence.
                tails.push(x);
            } else {
                // Same length, cheaper ending — more room to extend later.
                tails[i] = x;
            }
        }
        // tails itself need not be a real subsequence; only its length is.
        tails.len() as i32
    }
}
