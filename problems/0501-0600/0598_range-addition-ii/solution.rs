impl Solution {
    pub fn max_count(m: i32, n: i32, ops: Vec<Vec<i32>>) -> i64 {
        // Every operation covers the prefix rectangle anchored at the top-left
        // corner, so the cells incremented by all of them form the rectangle
        // sized by the smallest a and the smallest b; only those cells can
        // hold the maximum. Starting both minima at m and n covers empty ops,
        // where every cell stays 0 and all m*n cells are maximal.
        let mut min_a = m;
        let mut min_b = n;
        for op in &ops {
            if op[0] < min_a {
                min_a = op[0];
            }
            if op[1] < min_b {
                min_b = op[1];
            }
        }
        (min_a as i64) * (min_b as i64)
    }
}
