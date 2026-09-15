impl Solution {
    pub fn maximum_safeness_factor(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        // Multi-source BFS from every hazard at once: wavefront exploration
        // makes dist[r][c] the minimum grid steps to the nearest hazard —
        // exactly the cell's clearance value.
        let mut dist = vec![vec![-1i32; n]; n];
        let mut q: Vec<(usize, usize)> = Vec::new();
        for r in 0..n {
            for c in 0..n {
                if grid[r][c] == 1 {
                    dist[r][c] = 0;
                    q.push((r, c));
                }
            }
        }
        let dirs: [(i64, i64); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        let mut head = 0usize;
        while head < q.len() {
            let (r, c) = q[head];
            head += 1;
            for &(dr, dc) in &dirs {
                let nr = r as i64 + dr;
                let nc = c as i64 + dc;
                if nr >= 0 && nr < n as i64 && nc >= 0 && nc < n as i64 {
                    let (nr, nc) = (nr as usize, nc as usize);
                    if dist[nr][nc] == -1 {
                        dist[nr][nc] = dist[r][c] + 1;
                        q.push((nr, nc));
                    }
                }
            }
        }

        // Kruskal-style flood: admit cells in descending clearance, uniting
        // each with its already-admitted 4-neighbors, and watch the corners.
        // Their union traces a real all-admitted path, so it can only happen
        // at a clearance the answer reaches — and the best route's bottleneck
        // cell closes it exactly, making the value being admitted the answer.
        fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }
        let mut cells: Vec<(i32, usize, usize)> = Vec::with_capacity(n * n);
        for r in 0..n {
            for c in 0..n {
                cells.push((dist[r][c], r, c));
            }
        }
        cells.sort_by(|a, b| b.0.cmp(&a.0));
        let mut parent: Vec<usize> = (0..n * n).collect();
        let mut size = vec![1usize; n * n];
        let mut admitted = vec![vec![false; n]; n];
        for &(v, r, c) in &cells {
            admitted[r][c] = true;
            for &(dr, dc) in &dirs {
                let nr = r as i64 + dr;
                let nc = c as i64 + dc;
                if nr >= 0 && nr < n as i64 && nc >= 0 && nc < n as i64 {
                    let (nr, nc) = (nr as usize, nc as usize);
                    if admitted[nr][nc] {
                        let mut a = find(&mut parent, r * n + c);
                        let mut b = find(&mut parent, nr * n + nc);
                        if a != b {
                            if size[a] < size[b] {
                                std::mem::swap(&mut a, &mut b);
                            }
                            parent[b] = a;
                            size[a] += size[b];
                        }
                    }
                }
            }
            if find(&mut parent, 0) == find(&mut parent, n * n - 1) {
                return v;
            }
        }
        // The whole grid admits in the end, so the corners always unite; 0
        // is just the fallback.
        0
    }
}
