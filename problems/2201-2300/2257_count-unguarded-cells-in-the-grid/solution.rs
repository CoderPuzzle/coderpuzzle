impl Solution {
    pub fn count_unguarded(m: i32, n: i32, guards: Vec<Vec<i32>>, walls: Vec<Vec<i32>>) -> i32 {
        let (m, n) = (m as usize, n as usize);
        const WALL: u8 = 1;
        const GUARD: u8 = 2;
        const GUARDED: u8 = 3;
        let mut grid = vec![0u8; m * n];
        for wall in &walls {
            grid[(wall[0] as usize) * n + wall[1] as usize] = WALL;
        }
        for guard in &guards {
            grid[(guard[0] as usize) * n + guard[1] as usize] = GUARD;
        }
        for guard in &guards {
            let (gr, gc) = (guard[0] as usize, guard[1] as usize);
            for (dr, dc) in [(1i64, 0i64), (-1, 0), (0, 1), (0, -1)] {
                let mut row = gr as i64 + dr;
                let mut col = gc as i64 + dc;
                while row >= 0 && row < m as i64 && col >= 0 && col < n as i64 {
                    let cell = &mut grid[row as usize * n + col as usize];
                    if *cell == WALL || *cell == GUARD {
                        break;
                    }
                    *cell = GUARDED;
                    row += dr;
                    col += dc;
                }
            }
        }
        grid.iter().filter(|&&cell| cell == 0).count() as i32
    }
}
