use std::collections::HashMap;

impl Solution {
    pub fn largest_island(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        // Label each 4-connected island with a distinct color and
        // record its size; marking cells as they are pushed finds each
        // island exactly once.
        let mut label = vec![vec![0i32; n]; n];
        let mut sizes: HashMap<i32, i32> = HashMap::new();

        let dirs: [(i32, i32); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];

        let flood = |label: &mut Vec<Vec<i32>>, si: usize, sj: usize, color: i32| -> i32 {
            let mut count = 0;
            let mut stack: Vec<(usize, usize)> = vec![(si, sj)];
            label[si][sj] = color;
            while let Some((i, j)) = stack.pop() {
                count += 1;
                for &(di, dj) in &dirs {
                    let ni = i as i32 + di;
                    let nj = j as i32 + dj;
                    if ni >= 0 && nj >= 0 && (ni as usize) < n && (nj as usize) < n {
                        let (ni, nj) = (ni as usize, nj as usize);
                        if grid[ni][nj] == 1 && label[ni][nj] == 0 {
                            label[ni][nj] = color;
                            stack.push((ni, nj));
                        }
                    }
                }
            }
            count
        };

        let mut color = 0;
        for i in 0..n {
            for j in 0..n {
                if grid[i][j] == 1 && label[i][j] == 0 {
                    color += 1;
                    let size = flood(&mut label, i, j, color);
                    sizes.insert(color, size);
                }
            }
        }

        // Best starts at the largest existing island — also the answer
        // when the grid is all 1s and no 0 exists to flip.
        let mut best = 0;
        for &size in sizes.values() {
            if size > best {
                best = size;
            }
        }
        for i in 0..n {
            for j in 0..n {
                if grid[i][j] == 0 {
                    // Dedup matters: one island can touch this 0 on
                    // several sides, and counting it twice would
                    // overstate the merge.
                    let mut seen: Vec<i32> = Vec::new();
                    let mut total = 1;
                    for &(di, dj) in &dirs {
                        let ni = i as i32 + di;
                        let nj = j as i32 + dj;
                        if ni >= 0 && nj >= 0 && (ni as usize) < n && (nj as usize) < n {
                            let (ni, nj) = (ni as usize, nj as usize);
                            let c = label[ni][nj];
                            if c != 0 && !seen.contains(&c) {
                                seen.push(c);
                                total += sizes[&c];
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
