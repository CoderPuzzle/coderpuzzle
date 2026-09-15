impl Solution {
    pub fn find_path(grid: Vec<Vec<i32>>, k: i32) -> Vec<Vec<i32>> {
        // Backtrack over the walk, entering waypoint w only as the w-th
        // waypoint. Two prunes keep the 5x5 worst case instant: the
        // remaining cells must still balance by color (the walk strictly
        // alternates colors), and the unvisited region must stay connected.
        let m = grid.len();
        let n = grid[0].len();
        let total = m * n;
        let k = k as usize;
        let mut visited = vec![vec![false; n]; m];
        let mut remaining = [0_usize, 0];
        for r in 0..m {
            for c in 0..n {
                remaining[(r + c) % 2] += 1;
            }
        }
        let deltas: [(isize, isize); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];
        // Returns whether the unvisited cells form one connected region.
        fn connected(visited: &Vec<Vec<bool>>, m: usize, n: usize, deltas: [(isize, isize); 4]) -> bool {
            let mut unvisited_count = 0;
            let mut start = None;
            for r in 0..m {
                for c in 0..n {
                    if !visited[r][c] {
                        unvisited_count += 1;
                        start = Some(r * n + c);
                    }
                }
            }
            let start = match start {
                Some(s) => s,
                None => return true,
            };
            let mut seen = vec![false; m * n];
            seen[start] = true;
            let mut stack = vec![start];
            let mut reached = 0;
            while let Some(flat) = stack.pop() {
                reached += 1;
                let (r, c) = (flat / n, flat % n);
                for (dr, dc) in deltas {
                    let (nr, nc) = (r as isize + dr, c as isize + dc);
                    if nr >= 0
                        && (nr as usize) < m
                        && nc >= 0
                        && (nc as usize) < n
                        && !visited[nr as usize][nc as usize]
                        && !seen[nr as usize * n + nc as usize]
                    {
                        seen[nr as usize * n + nc as usize] = true;
                        stack.push(nr as usize * n + nc as usize);
                    }
                }
            }
            reached == unvisited_count
        }
        fn dfs(
            grid: &Vec<Vec<i32>>,
            visited: &mut Vec<Vec<bool>>,
            remaining: &mut [usize; 2],
            path: &mut Vec<Vec<i32>>,
            m: usize,
            n: usize,
            total: usize,
            k: usize,
            deltas: [(isize, isize); 4],
            r: usize,
            c: usize,
            count: usize,
            nxt: usize,
        ) -> bool {
            let value = grid[r][c] as usize;
            if value != 0 && value != nxt {
                return false;
            }
            visited[r][c] = true;
            path[count] = vec![r as i32, c as i32];
            let nxt = if value == nxt { nxt + 1 } else { nxt };
            let count = count + 1;
            let color = (r + c) % 2;
            remaining[color] -= 1;
            let mut ok = false;
            if count == total {
                ok = true;
            } else {
                let left = total - count;
                // The rest of the walk alternates colors, starting on the
                // opposite color of the current cell.
                if remaining[1 - color] == (left + 1) / 2
                    && remaining[color] == left / 2
                    && connected(visited, m, n, deltas)
                {
                    for (dr, dc) in deltas {
                        let (nr, nc) = (r as isize + dr, c as isize + dc);
                        if nr >= 0
                            && (nr as usize) < m
                            && nc >= 0
                            && (nc as usize) < n
                            && !visited[nr as usize][nc as usize]
                            && dfs(
                                grid,
                                visited,
                                remaining,
                                path,
                                m,
                                n,
                                total,
                                k,
                                deltas,
                                nr as usize,
                                nc as usize,
                                count,
                                nxt,
                            )
                        {
                            ok = true;
                            break;
                        }
                    }
                }
            }
            if !ok {
                visited[r][c] = false;
            }
            remaining[color] += 1;
            ok
        }
        let mut path = vec![vec![0_i32, 0]; total];
        for r in 0..m {
            for c in 0..n {
                if (grid[r][c] == 0 || grid[r][c] == 1)
                    && dfs(
                        &grid,
                        &mut visited,
                        &mut remaining,
                        &mut path,
                        m,
                        n,
                        total,
                        k,
                        deltas,
                        r,
                        c,
                        0,
                        1,
                    )
                {
                    return path;
                }
            }
        }
        Vec::new()
    }
}
