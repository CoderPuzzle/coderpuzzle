impl Solution {
    pub fn min_sensors(n: i32, m: i32, k: i32) -> i32 {
        // A radius-k sensor covers an s x s square with s = 2 * k + 1, so
        // tile the grid: ceil(n / s) row strips times ceil(m / s) column
        // strips, one sensor per block.
        let side = 2 * k + 1;
        ((n + side - 1) / side) * ((m + side - 1) / side)
    }
}
