// Construction indexes where every value lives; each query looks the value
// up once and adds its four in-bounds neighbors straight off the grid.
// Distinct values make the index exact, and edge cells simply find fewer
// in-bounds neighbors — no corner or border special cases.
pub struct NeighborSum {
    grid: Vec<Vec<i32>>,
    row_of: Vec<usize>,
    col_of: Vec<usize>,
}

impl NeighborSum {
    pub fn new(grid: Vec<Vec<i32>>) -> Self {
        // One walk builds the whole index: values are distinct and run
        // 0..n*n-1, so each value's cell can be stored at its own slot.
        let n = grid.len();
        let mut row_of = vec![0usize; n * n];
        let mut col_of = vec![0usize; n * n];
        for r in 0..n {
            for c in 0..n {
                row_of[grid[r][c] as usize] = r;
                col_of[grid[r][c] as usize] = c;
            }
        }
        NeighborSum { grid, row_of, col_of }
    }

    pub fn adjacentSum(&mut self, value: i32) -> i32 {
        self.sumAround(value, [(-1, 0), (1, 0), (0, -1), (0, 1)])
    }

    pub fn diagonalSum(&mut self, value: i32) -> i32 {
        self.sumAround(value, [(-1, -1), (-1, 1), (1, -1), (1, 1)])
    }

    fn sumAround(&self, value: i32, offsets: [(isize, isize); 4]) -> i32 {
        let v = value as usize;
        let r = self.row_of[v] as isize;
        let c = self.col_of[v] as isize;
        let n = self.grid.len() as isize;
        let mut total = 0;
        for (dr, dc) in offsets {
            let nr = r + dr;
            let nc = c + dc;
            if nr >= 0 && nr < n && nc >= 0 && nc < n {
                total += self.grid[nr as usize][nc as usize];
            }
        }
        total
    }
}
