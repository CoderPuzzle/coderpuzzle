impl Solution {
    pub fn count_sub_islands(grid1: Vec<Vec<i32>>, grid2: Vec<Vec<i32>>) -> i32 {
        let m = grid2.len();
        let n = grid2[0].len();
        let mut seen = vec![vec![false; n]; m];
        let mut count = 0;
        let dirs: [(i32, i32); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        for si in 0..m {
            for sj in 0..n {
                if grid2[si][sj] == 1 && !seen[si][sj] {
                    seen[si][sj] = true;
                    let mut stack: Vec<(usize, usize)> = vec![(si, sj)];
                    let mut is_sub = true;
                    while let Some((x, y)) = stack.pop() {
                        if grid1[x][y] != 1 {
                            is_sub = false;
                        }
                        for (dx, dy) in dirs {
                            let nx = x as i32 + dx;
                            let ny = y as i32 + dy;
                            if nx >= 0 && (nx as usize) < m && ny >= 0 && (ny as usize) < n {
                                let (nx, ny) = (nx as usize, ny as usize);
                                if grid2[nx][ny] == 1 && !seen[nx][ny] {
                                    seen[nx][ny] = true;
                                    stack.push((nx, ny));
                                }
                            }
                        }
                    }
                    if is_sub {
                        count += 1;
                    }
                }
            }
        }
        count
    }
}
