impl Solution {
    pub fn min_operations(n: i32) -> i32 {
        let m = n as i64;
        ((m * m) / 4) as i32
    }
}
