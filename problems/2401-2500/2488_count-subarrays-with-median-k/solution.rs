impl Solution {
    pub fn count_subarrays(nums: Vec<i32>, k: i32) -> i64 {
        let n = nums.len();
        let pos = nums.iter().position(|&v| v == k).unwrap();
        // balance ranges over [-n, n]; offset by n.
        let mut balance = vec![0i64; 2 * n + 1];
        balance[n] = 1;
        let mut current: usize = n; // current + n stored as index
        let mut count: i64 = 0;
        for (i, &v) in nums.iter().enumerate() {
            if v > k {
                current += 1;
            } else if v < k {
                current -= 1;
            }
            if i >= pos {
                count += balance[current] + balance[current - 1];
            } else {
                balance[current] += 1;
            }
        }
        count
    }
}
