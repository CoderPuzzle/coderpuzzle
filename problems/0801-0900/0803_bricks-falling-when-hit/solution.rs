impl Solution {
    pub fn hit_bricks(grid: Vec<Vec<i32>>, hits: Vec<Vec<i32>>) -> Vec<i32> {
        let m = grid.len();
        let n = grid[0].len();
        let top = m * n;
        let mut parent: Vec<usize> = (0..=top).collect();
        let mut size: Vec<i32> = vec![1; top + 1];
        size[top] = 0;

        fn find(parent: &mut Vec<usize>, x: usize) -> usize {
            let mut x = x;
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        fn union(parent: &mut Vec<usize>, size: &mut Vec<i32>, a: usize, b: usize) {
            let mut ra = find(parent, a);
            let mut rb = find(parent, b);
            if ra == rb {
                return;
            }
            if size[ra] < size[rb] {
                std::mem::swap(&mut ra, &mut rb);
            }
            parent[rb] = ra;
            size[ra] += size[rb];
        }

        let idx = |r: usize, c: usize| r * n + c;

        // Final grid after all hits are applied.
        let mut g: Vec<Vec<i32>> = grid.clone();
        for hit in &hits {
            g[hit[0] as usize][hit[1] as usize] = 0;
        }

        let dirs: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

        // Union all remaining bricks with each other and with the virtual top.
        for r in 0..m {
            for c in 0..n {
                if g[r][c] == 1 {
                    if r == 0 {
                        union(&mut parent, &mut size, idx(r, c), top);
                    }
                    if r + 1 < m && g[r + 1][c] == 1 {
                        union(&mut parent, &mut size, idx(r, c), idx(r + 1, c));
                    }
                    if c + 1 < n && g[r][c + 1] == 1 {
                        union(&mut parent, &mut size, idx(r, c), idx(r, c + 1));
                    }
                }
            }
        }

        let mut res: Vec<i32> = vec![0; hits.len()];
        for k in (0..hits.len()).rev() {
            let r = hits[k][0] as usize;
            let c = hits[k][1] as usize;
            if grid[r][c] != 1 {
                continue;
            }
            let before = size[find(&mut parent, top)];
            g[r][c] = 1;
            if r == 0 {
                union(&mut parent, &mut size, idx(r, c), top);
            }
            for &(dr, dc) in &dirs {
                let nr = r as i32 + dr;
                let nc = c as i32 + dc;
                if nr >= 0 && (nr as usize) < m && nc >= 0 && (nc as usize) < n && g[nr as usize][nc as usize] == 1 {
                    union(&mut parent, &mut size, idx(r, c), idx(nr as usize, nc as usize));
                }
            }
            let after = size[find(&mut parent, top)];
            res[k] = std::cmp::max(0, after - before - 1);
        }
        res
    }
}
