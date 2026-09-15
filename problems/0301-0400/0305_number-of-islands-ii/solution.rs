impl Solution {
    pub fn num_islands2(m: i32, n: i32, positions: Vec<Vec<i32>>) -> Vec<i32> {
        let (m, n) = (m as usize, n as usize);
        // Union-find over flattened cell ids r * n + c keeps the island count
        // incremental; no full grid rescan after each add-land.
        let total = m * n;
        let mut parent: Vec<usize> = (0..total).collect();
        let mut size: Vec<usize> = vec![1; total];
        let mut land: Vec<bool> = vec![false; total];
        let mut count = 0usize;
        let mut answer: Vec<i32> = Vec::with_capacity(positions.len());
        for pos in &positions {
            let (r, c) = (pos[0] as usize, pos[1] as usize);
            let cell = r * n + c;
            // A repeated position changes nothing; re-emit the current count.
            if land[cell] {
                answer.push(count as i32);
                continue;
            }
            // The new land starts as its own island before any merges.
            land[cell] = true;
            count += 1;
            for (dr, dc) in [(1i64, 0i64), (-1, 0), (0, 1), (0, -1)] {
                let nr = r as i64 + dr;
                let nc = c as i64 + dc;
                if nr < 0 || nr >= m as i64 || nc < 0 || nc >= n as i64 {
                    continue;
                }
                let neighbor = (nr as usize) * n + nc as usize;
                if !land[neighbor] {
                    continue;
                }
                // Distinct roots mean two islands merge, losing one count; a
                // later neighbor of the same island re-finds the merged root,
                // so no extra decrement sneaks in.
                let ra = find(&mut parent, cell);
                let rb = find(&mut parent, neighbor);
                if ra != rb {
                    // Union by size: attach the smaller tree underneath.
                    if size[ra] < size[rb] {
                        parent[rb] = ra;
                        size[ra] += size[rb];
                    } else {
                        parent[ra] = rb;
                        size[rb] += size[ra];
                    }
                    count -= 1;
                }
            }
            answer.push(count as i32);
        }
        answer
    }
}

fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
    // Path halving: splice x onto its grandparent, flattening chains.
    while parent[x] != x {
        parent[x] = parent[parent[x]];
        x = parent[x];
    }
    x
}
