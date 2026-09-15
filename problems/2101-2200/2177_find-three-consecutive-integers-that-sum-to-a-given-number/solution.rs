impl Solution {
    pub fn sum_of_three(num: i64) -> Vec<i64> {
        // Three consecutive integers x-1, x, x+1 sum to exactly 3x, so a
        // triple exists iff num is a multiple of 3. num reaches 10^15,
        // which needs i64.
        if num % 3 != 0 {
            return vec![];
        }
        let mid = num / 3;
        vec![mid - 1, mid, mid + 1]
    }
}
