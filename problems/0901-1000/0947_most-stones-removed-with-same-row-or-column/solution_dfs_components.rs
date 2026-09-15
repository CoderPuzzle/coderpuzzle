impl Solution {
    // Row-or-column adjacency splits the stones into connected components,
    // and a component of k stones gives up k - 1 of them, so the answer is n
    // minus the number of components. Rather than encode the merging, walk
    // it: bucket the stone indices by row and by column, then depth-first
    // search from every stone not yet reached, expanding through both of its
    // buckets. Each bucket is removed the first time it is expanded, so the
    // whole shared line is absorbed at once and no bucket is ever scanned
    // twice.
    pub fn remove_stones(stones: Vec<Vec<i32>>) -> i32 {
        use std::collections::HashMap;
        let n = stones.len();
        let mut rows: HashMap<i32, Vec<usize>> = HashMap::new();
        let mut cols: HashMap<i32, Vec<usize>> = HashMap::new();
        for i in 0..n {
            rows.entry(stones[i][0]).or_insert_with(Vec::new).push(i);
            cols.entry(stones[i][1]).or_insert_with(Vec::new).push(i);
        }

        let mut visited = vec![false; n];
        let mut stack: Vec<usize> = Vec::new();
        let mut components = 0usize;
        for start in 0..n {
            if visited[start] {
                continue;
            }
            components += 1;
            visited[start] = true;
            stack.push(start);
            while let Some(u) = stack.pop() {
                if let Some(group) = rows.remove(&stones[u][0]) {
                    for &v in group.iter() {
                        if !visited[v] {
                            visited[v] = true;
                            stack.push(v);
                        }
                    }
                }
                if let Some(group) = cols.remove(&stones[u][1]) {
                    for &v in group.iter() {
                        if !visited[v] {
                            visited[v] = true;
                            stack.push(v);
                        }
                    }
                }
            }
        }

        (n - components) as i32
    }
}
