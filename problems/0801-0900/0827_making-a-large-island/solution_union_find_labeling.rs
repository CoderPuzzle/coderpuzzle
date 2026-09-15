impl Solution {
    pub fn largest_island(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        let cells = n * n;
        // Disjoint-set forest over the cells: parent[i*n+j] points at the
        // cell's current representative, and size is maintained per
        // representative only. Union by size plus path compression keeps
        // the trees nearly flat.
        let mut parent: Vec<usize> = (0..cells).collect();
        let mut size: Vec<i32> = vec![1; cells];

        let dirs: [(i32, i32); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];

        let find = |parent: &mut Vec<usize>, mut x: usize| -> usize {
            let mut root = x;
            while parent[root] != root {
                root = parent[root];
            }
            while parent[x] != root {
                let next = parent[x];
                parent[x] = root;
                x = next;
            }
            root
        };

        let unite = |parent: &mut Vec<usize>, size: &mut Vec<i32>, a: usize, b: usize| {
            let mut ra = find(&mut *parent, a);
            let mut rb = find(&mut *parent, b);
            if ra == rb {
                return;
            }
            if size[ra] < size[rb] {
                std::mem::swap(&mut ra, &mut rb);
            }
            parent[rb] = ra;
            size[ra] += size[rb];
        };

        // One row-major pass: each 1-cell joins the (already processed)
        // 1-cell to its left and the one above, so every island is
        // assembled edge by edge and no traversal stack is needed.
        for i in 0..n {
            for j in 0..n {
                if grid[i][j] == 1 {
                    let idx = i * n + j;
                    if j > 0 && grid[i][j - 1] == 1 {
                        unite(&mut parent, &mut size, idx, idx - 1);
                    }
                    if i > 0 && grid[i - 1][j] == 1 {
                        unite(&mut parent, &mut size, idx, idx - n);
                    }
                }
            }
        }

        // Best starts at the largest existing island — also the answer
        // when the grid is all 1s and no 0 exists to flip.
        let mut best = 0;
        for i in 0..n {
            for j in 0..n {
                if grid[i][j] == 1 {
                    let s = size[find(&mut parent, i * n + j)];
                    if s > best {
                        best = s;
                    }
                }
            }
        }
        for i in 0..n {
            for j in 0..n {
                if grid[i][j] == 0 {
                    // Dedup matters: one island can touch this 0 on
                    // several sides, and counting it twice would
                    // overstate the merge. The dedup key is the root.
                    let mut seen: Vec<usize> = Vec::new();
                    let mut total = 1;
                    for &(di, dj) in &dirs {
                        let ni = i as i32 + di;
                        let nj = j as i32 + dj;
                        if ni >= 0 && nj >= 0 && (ni as usize) < n && (nj as usize) < n {
                            let (ni, nj) = (ni as usize, nj as usize);
                            if grid[ni][nj] == 1 {
                                let root = find(&mut parent, ni * n + nj);
                                if !seen.contains(&root) {
                                    seen.push(root);
                                    total += size[root];
                                }
                            }
                        }
                    }
                    if total > best {
                        best = total;
                    }
                }
            }
        }
        best
    }
}
