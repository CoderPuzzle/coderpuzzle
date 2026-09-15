impl Solution {
    pub fn maximum_number_of_ones(width: i32, height: i32, side_length: i32, max_ones: i32) -> i32 {
        // Each residue class (r, c) mod sideLength appears in every window
        // exactly once, so the constraint binds classes. Count how many
        // grid cells fall into each class: full blocks plus the leftover
        // strip when the remainder reaches r (or c).
        let side = side_length as usize;
        let mut counts: Vec<i64> = Vec::with_capacity(side * side);
        for r in 0..side {
            for c in 0..side {
                let extra_rows = if (height as usize) % side > r { 1 } else { 0 };
                let extra_cols = if (width as usize) % side > c { 1 } else { 0 };
                let rows = height as i64 / side as i64 + extra_rows;
                let cols = width as i64 / side as i64 + extra_cols;
                counts.push(rows * cols);
            }
        }
        counts.sort_unstable_by(|a, b| b.cmp(a));
        let total: i64 = counts[..max_ones as usize].iter().sum();
        total as i32
    }
}
