impl Solution {
    // BFS in layers, where each layer holds every cell reachable with d
    // moves. Teleports cost 0, so each layer first runs its full closure:
    // the first cell of a letter seen in the layer claims every unvisited
    // cell of that letter. Only then are adjacent cells moved into the
    // next layer — a same-layer teleport must beat a move claimed earlier.
    pub fn min_moves(matrix: Vec<String>) -> i32 {
        let m = matrix.len();
        let n = matrix[0].len();
        let total = m * n;
        let mut dist = vec![-1i32; total];
        let mut portals: Vec<Vec<usize>> = vec![Vec::new(); 26];
        for r in 0..m {
            for c in 0..n {
                let ch = matrix[r].as_bytes()[c];
                if ch.is_ascii_uppercase() {
                    portals[(ch - b'A') as usize].push(r * n + c);
                }
            }
        }
        let mut used = [false; 26];
        let mut layer: Vec<usize> = vec![0];
        let mut nxt: Vec<usize> = Vec::new();
        dist[0] = 0;
        let mut d: i32 = 0;
        while !layer.is_empty() {
            let mut head = 0;
            while head < layer.len() {
                let pos = layer[head];
                head += 1;
                let ch = matrix[pos / n].as_bytes()[pos % n];
                if ch.is_ascii_uppercase() {
                    let k = (ch - b'A') as usize;
                    if !used[k] {
                        used[k] = true;
                        for &q in &portals[k] {
                            if dist[q] == -1 {
                                dist[q] = d;
                                layer.push(q);
                            }
                        }
                    }
                }
            }
            nxt.clear();
            for &pos in &layer {
                let r = pos / n;
                let c = pos % n;
                if r > 0 && dist[pos - n] == -1 && matrix[r - 1].as_bytes()[c] != b'#' {
                    dist[pos - n] = d + 1;
                    nxt.push(pos - n);
                }
                if r + 1 < m && dist[pos + n] == -1 && matrix[r + 1].as_bytes()[c] != b'#' {
                    dist[pos + n] = d + 1;
                    nxt.push(pos + n);
                }
                if c > 0 && dist[pos - 1] == -1 && matrix[r].as_bytes()[c - 1] != b'#' {
                    dist[pos - 1] = d + 1;
                    nxt.push(pos - 1);
                }
                if c + 1 < n && dist[pos + 1] == -1 && matrix[r].as_bytes()[c + 1] != b'#' {
                    dist[pos + 1] = d + 1;
                    nxt.push(pos + 1);
                }
            }
            std::mem::swap(&mut layer, &mut nxt);
            d += 1;
        }
        dist[total - 1]
    }
}
