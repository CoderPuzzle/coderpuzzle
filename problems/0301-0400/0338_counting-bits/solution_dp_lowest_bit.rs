impl Solution {
    pub fn count_bits(n: i32) -> Vec<i32> {
        let n = n as usize;
        let mut ans = vec![0i32; n + 1];
        // i & (i - 1) clears i's lowest set bit, so its popcount is already
        // computed; the +1 adds the cleared bit back. Since i & (i-1) < i
        // for every i >= 1, ascending order keeps the needed value ready.
        for i in 1..=n {
            ans[i] = ans[i & (i - 1)] + 1;
        }
        ans
    }
}
