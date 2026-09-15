// Seen along one axis of the city, every row collapses to its tallest
// building, and seen along the other, every column does — those 2n
// maxima are all four skylines hold. A raise is safe exactly while the
// building stays at or below both of its maxima, so the shorter of the
// two is each cell's ceiling and the answer is the total gap below it.
impl Solution {
    pub fn max_increase_keeping_skyline(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        let row_max: Vec<i32> = grid.iter().map(|row| *row.iter().max().unwrap()).collect();
        let mut col_max = grid[0].clone();
        for row in &grid[1..] {
            for (c, &height) in row.iter().enumerate() {
                col_max[c] = col_max[c].max(height);
            }
        }
        let mut total = 0;
        for r in 0..n {
            for c in 0..n {
                total += row_max[r].min(col_max[c]) - grid[r][c];
            }
        }
        total
    }
}
