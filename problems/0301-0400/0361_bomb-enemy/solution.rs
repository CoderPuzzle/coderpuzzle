impl Solution {
    pub fn max_killed_enemies(grid: Vec<Vec<String>>) -> i32 {
        // A bomb planted on an empty cell kills along its row and column
        // until a wall, so its reach is the two wall-free segments crossing
        // the cell. Every empty cell in a segment shares that segment's
        // enemies: count each segment once and reuse the count.
        let m = grid.len();
        let n = grid[0].len();
        let mut col_hits = vec![0usize; n];
        let mut best = 0usize;
        for i in 0..m {
            let mut row_hits = 0;
            for j in 0..n {
                // First cell of a row segment (after a wall or at the left
                // edge): one scan counts the enemies up to the next wall.
                if j == 0 || grid[i][j - 1] == "W" {
                    row_hits = count_row(&grid, i, j);
                }
                // Same lazily per column: recount only when the cell above
                // is a wall or the top edge.
                if i == 0 || grid[i - 1][j] == "W" {
                    col_hits[j] = count_col(&grid, i, j);
                }
                if grid[i][j] == "0" {
                    best = best.max(row_hits + col_hits[j]);
                }
            }
        }
        best as i32
    }
}

// Enemies in row i from column j up to the next wall.
fn count_row(grid: &[Vec<String>], i: usize, j: usize) -> usize {
    let mut hits = 0;
    for k in j..grid[i].len() {
        if grid[i][k] == "W" {
            break;
        }
        if grid[i][k] == "E" {
            hits += 1;
        }
    }
    hits
}

// Enemies in column j from row i down to the next wall.
fn count_col(grid: &[Vec<String>], i: usize, j: usize) -> usize {
    let mut hits = 0;
    for k in i..grid.len() {
        if grid[k][j] == "W" {
            break;
        }
        if grid[k][j] == "E" {
            hits += 1;
        }
    }
    hits
}
