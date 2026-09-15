impl Solution {
    // Sweep the rows in zigzag order (even rows left-to-right, odd rows
    // reversed) flipping a take/skip toggle at every cell.
    pub fn zigzag_traversal(grid: Vec<Vec<i32>>) -> Vec<i32> {
        let mut result = Vec::new();
        let mut take = true;
        for (i, row) in grid.iter().enumerate() {
            let cells: Box<dyn Iterator<Item = &i32>> = if i % 2 == 0 {
                Box::new(row.iter())
            } else {
                Box::new(row.iter().rev())
            };
            for value in cells {
                if take {
                    result.push(*value);
                }
                take = !take;
            }
        }
        result
    }
}
