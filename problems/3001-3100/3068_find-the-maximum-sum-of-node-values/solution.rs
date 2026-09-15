impl Solution {
    pub fn maximum_value_sum(nums: Vec<i32>, k: i32, edges: Vec<Vec<i32>>) -> i64 {
        let mut base: i64 = 0;
        let mut pos_count: usize = 0;
        let mut min_pos: i64 = i64::MAX;
        let mut max_non_pos: i64 = i64::MIN;
        let mut has_pos = false;
        let mut has_non_pos = false;
        // Each operation XORs two endpoints, and tree connectivity lets any
        // even-sized subset of nodes be flipped, so only the parity of the
        // pick matters. d = gain from flipping one node; greedily take every
        // positive delta while tracking the smallest positive and the largest
        // non-positive for a possible parity fix.
        for &x in &nums {
            let d = (x ^ k) as i64 - x as i64;
            base += x as i64;
            if d > 0 {
                pos_count += 1;
                base += d;
                if !has_pos || d < min_pos {
                    min_pos = d;
                }
                has_pos = true;
            } else {
                if !has_non_pos || d > max_non_pos {
                    max_non_pos = d;
                }
                has_non_pos = true;
            }
        }
        if pos_count % 2 == 0 {
            return base;
        }
        // Odd flip count is illegal: either drop the smallest positive delta
        // or add the largest non-positive one, whichever costs less.
        let mut best = if has_pos { min_pos } else { i64::MAX };
        if has_non_pos {
            let penalty = -max_non_pos;
            if penalty < best {
                best = penalty;
            }
        }
        base - best
    }
}
