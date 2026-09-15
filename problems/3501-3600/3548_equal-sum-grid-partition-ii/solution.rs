use std::collections::HashSet;

impl Solution {
    pub fn can_partition_grid(grid: Vec<Vec<i32>>) -> bool {
        // A straight cut yields two rectangular slabs. Removing any single
        // cell from a slab spanning at least two rows and two columns keeps
        // it connected, so only slabs that are a single row or column
        // restrict the discount to their two end cells (a 1x1 slab would
        // empty out and can never match the other side's positive sum).
        // Sweep each axis twice with rolling prefix sums and a value set:
        // the forward pass tries discounting the leading slab, the backward
        // pass the trailing one. Sums reach 10^5 * 10^5 = 10^10, so they
        // are carried in i64.
        let m = grid.len();
        let n = grid[0].len();
        let total: i64 = grid.iter().flat_map(|row| row.iter()).map(|&v| v as i64).sum();
        let can_discount = |d: i64, a: usize, b: usize, vertical: bool, seen: &HashSet<i64>| -> bool {
            // Can discounting one cell of value d from the slab rows/cols
            // a..b equalize the two sides while keeping the slab connected?
            if vertical {
                if a == b {
                    return m > 1 && (grid[0][a] as i64 == d || grid[m - 1][a] as i64 == d);
                }
                if m == 1 {
                    return grid[0][a] as i64 == d || grid[0][b] as i64 == d;
                }
                return seen.contains(&d);
            }
            if a == b {
                return n > 1 && (grid[a][0] as i64 == d || grid[a][n - 1] as i64 == d);
            }
            if n == 1 {
                return grid[a][0] as i64 == d || grid[b][0] as i64 == d;
            }
            seen.contains(&d)
        };
        let mut seen = HashSet::new();
        let mut top: i64 = 0;
        for i in 0..m - 1 {
            for &v in &grid[i] {
                seen.insert(v as i64);
                top += v as i64;
            }
            let bottom = total - top;
            if top == bottom || (top > bottom && can_discount(top - bottom, 0, i, false, &seen)) {
                return true;
            }
        }
        let mut seen = HashSet::new();
        let mut bottom: i64 = 0;
        for i in (1..m).rev() {
            for &v in &grid[i] {
                seen.insert(v as i64);
                bottom += v as i64;
            }
            top = total - bottom;
            if top == bottom || (bottom > top && can_discount(bottom - top, i, m - 1, false, &seen)) {
                return true;
            }
        }
        let mut seen = HashSet::new();
        let mut left: i64 = 0;
        for j in 0..n - 1 {
            for r in 0..m {
                seen.insert(grid[r][j] as i64);
                left += grid[r][j] as i64;
            }
            let right = total - left;
            if left == right || (left > right && can_discount(left - right, 0, j, true, &seen)) {
                return true;
            }
        }
        let mut seen = HashSet::new();
        let mut right: i64 = 0;
        for j in (1..n).rev() {
            for r in 0..m {
                seen.insert(grid[r][j] as i64);
                right += grid[r][j] as i64;
            }
            left = total - right;
            if left == right || (right > left && can_discount(right - left, j, n - 1, true, &seen)) {
                return true;
            }
        }
        false
    }
}
