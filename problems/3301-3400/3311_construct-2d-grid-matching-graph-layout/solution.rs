impl Solution {
    pub fn construct_grid_layout(n: i32, edges: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let n = n as usize;
        let mut adj: Vec<Vec<i32>> = vec![Vec::new(); n];
        for edge in &edges {
            let (u, v) = (edge[0] as usize, edge[1] as usize);
            adj[u].push(edge[1]);
            adj[v].push(edge[0]);
        }

        // 1 x C (or R x 1) input: the graph is a path with two degree-1 ends.
        let endpoint = adj.iter().position(|list| list.len() == 1);
        if let Some(start) = endpoint {
            let mut placed = vec![false; n];
            let mut row = vec![start as i32];
            placed[start] = true;
            loop {
                let mut next: i32 = -1;
                for &u in &adj[*row.last().unwrap() as usize] {
                    if !placed[u as usize] {
                        next = u;
                    }
                }
                if next < 0 {
                    break;
                }
                row.push(next);
                placed[next as usize] = true;
            }
            return vec![row];
        }

        // Both dimensions >= 2: corners are exactly the degree-2 nodes, and
        // edges = 2n - (rows + cols), so rows + cols is known from n and E.
        let corner = adj.iter().position(|list| list.len() == 2).unwrap() as usize;
        let dims_sum = 2 * n - edges.len();
        let mut rows = 0;
        let mut cols = 0;
        for t in 1..dims_sum {
            if t * (dims_sum - t) == n {
                rows = t;
                cols = dims_sum - t;
                break;
            }
        }
        for &first in &adj[corner] {
            if let Some(grid) = grid_build(&adj, corner, first as usize, rows, cols) {
                return grid;
            }
        }
        Vec::new()
    }
}

fn grid_build(adj: &[Vec<i32>], corner: usize, first: usize, rows: usize, cols: usize) -> Option<Vec<Vec<i32>>> {
    let n = adj.len();
    let mut placed = vec![false; n];
    let mut row0 = vec![corner as i32, first as i32];
    placed[corner] = true;
    placed[first] = true;
    while row0.len() < cols {
        let w = row0[row0.len() - 1] as usize;
        let p = row0[row0.len() - 2] as usize;
        let mut next: i32 = -1;
        for &u in &adj[w] {
            let u = u as usize;
            if placed[u] || u == p {
                continue;
            }
            if shares_neighbor(adj, u, p, w) {
                continue;
            }
            if next >= 0 {
                return None;
            }
            next = u as i32;
        }
        if next < 0 {
            return None;
        }
        row0.push(next);
        placed[next as usize] = true;
    }

    let mut grid: Vec<Vec<i32>> = vec![row0];
    while grid.len() < rows {
        let prev = grid.last().unwrap().clone();
        let mut row: Vec<i32> = Vec::with_capacity(cols);
        let mut start: i32 = -1;
        for &u in &adj[prev[0] as usize] {
            if !placed[u as usize] {
                if start >= 0 {
                    return None;
                }
                start = u;
            }
        }
        if start < 0 {
            return None;
        }
        row.push(start);
        placed[start as usize] = true;
        for j in 1..cols {
            let mut hit: i32 = -1;
            for &u in &adj[row[j - 1] as usize] {
                if placed[u as usize] || !adj[prev[j] as usize].contains(&u) {
                    continue;
                }
                if hit >= 0 {
                    return None;
                }
                hit = u;
            }
            if hit < 0 {
                return None;
            }
            row.push(hit);
            placed[hit as usize] = true;
        }
        grid.push(row);
    }
    if !placed.into_iter().all(|flag| flag) {
        return None;
    }
    Some(grid)
}

fn shares_neighbor(adj: &[Vec<i32>], u: usize, p: usize, w: usize) -> bool {
    for &z in &adj[u] {
        if z as usize == w {
            continue;
        }
        for &x in &adj[p] {
            if z == x {
                return true;
            }
        }
    }
    false
}
