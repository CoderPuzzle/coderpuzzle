impl Solution {
    // Every exposed face belongs to some tower: an occupied cell owns a top
    // and a bottom face, and each of its four walls shows exactly the strip
    // rising above the neighboring cell (empty ground or the grid's edge is
    // a neighbor of height 0).
    pub fn surface_area(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len() as i32;
        let mut total: i32 = 0;
        for i in 0..n {
            for j in 0..n {
                let v = grid[i as usize][j as usize];
                if v > 0 {
                    total += 2;
                    for (di, dj) in [(-1, 0), (1, 0), (0, -1), (0, 1)] {
                        let (ni, nj) = (i + di, j + dj);
                        let inside = ni >= 0 && ni < n && nj >= 0 && nj < n;
                        let neighbor = if inside { grid[ni as usize][nj as usize] } else { 0 };
                        if v > neighbor {
                            total += v - neighbor;
                        }
                    }
                }
            }
        }
        total
    }
}
