impl Solution {
    // Gravity first: in each original row stones slide right until an
    // obstacle or the wall. Then a 90-degree clockwise rotation maps
    // new[r][c] to old[m - 1 - c][r].
    pub fn rotate_the_box(box_grid: Vec<Vec<String>>) -> Vec<Vec<String>> {
        let m = box_grid.len();
        let n = box_grid[0].len();
        let mut rows = box_grid;
        for r in 0..m {
            let mut write = n - 1;
            for c in (0..n).rev() {
                if rows[r][c].as_str() == "*" {
                    write = c - 1;
                } else if rows[r][c].as_str() == "#" {
                    rows[r].swap(c, write);
                    write -= 1;
                }
            }
        }
        let mut out = vec![vec![String::from("."); m]; n];
        for r in 0..n {
            for c in 0..m {
                out[r][c] = rows[m - 1 - c][r].clone();
            }
        }
        out
    }
}
