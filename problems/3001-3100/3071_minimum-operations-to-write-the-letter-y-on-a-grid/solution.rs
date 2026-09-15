impl Solution {
    pub fn minimum_operations_to_write_y(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len() as i32;
        let mid = n / 2;
        let mut y_count = [0_i32; 3];
        let mut other_count = [0_i32; 3];
        for r in 0..n {
            for c in 0..n {
                let on_y = (r == c && r <= mid) || (c == n - 1 - r && r <= mid) || (c == mid && r >= mid);
                if on_y {
                    y_count[usize::try_from(grid[r as usize][c as usize]).unwrap()] += 1;
                } else {
                    other_count[usize::try_from(grid[r as usize][c as usize]).unwrap()] += 1;
                }
            }
        }
        let mut best = n * n;
        for y_value in 0..3 {
            for other_value in 0..3 {
                if y_value == other_value {
                    continue;
                }
                let mut cost = 0;
                for value in 0..3 {
                    if value != y_value {
                        cost += y_count[value];
                    }
                    if value != other_value {
                        cost += other_count[value];
                    }
                }
                best = best.min(cost);
            }
        }
        best
    }
}
