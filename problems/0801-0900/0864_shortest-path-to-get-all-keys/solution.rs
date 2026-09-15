use std::collections::VecDeque;

impl Solution {
    pub fn shortest_path_all_keys(grid: Vec<String>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        let bytes: Vec<&[u8]> = grid.iter().map(|s| s.as_bytes()).collect();
        let mut sr = 0usize;
        let mut sc = 0usize;
        let mut target = 0usize;
        for i in 0..m {
            for j in 0..n {
                let ch = bytes[i][j];
                if ch == b'@' {
                    sr = i;
                    sc = j;
                } else if (b'a'..=b'f').contains(&ch) {
                    target |= 1usize << (ch - b'a') as usize;
                }
            }
        }
        let size = 1usize << 6;
        let mut dist = vec![-1i32; m * n * size];
        let mut queue: VecDeque<(usize, usize, usize)> = VecDeque::new();
        dist[(sr * n + sc) * size] = 0;
        queue.push_back((sr, sc, 0));
        let dr = [1i32, -1, 0, 0];
        let dc = [0i32, 0, 1, -1];
        while let Some((r, c, mask)) = queue.pop_front() {
            if mask == target {
                return dist[(r * n + c) * size + mask];
            }
            let d = dist[(r * n + c) * size + mask];
            for k in 0..4 {
                let nr = r as i32 + dr[k];
                let nc = c as i32 + dc[k];
                if nr < 0 || nr >= m as i32 || nc < 0 || nc >= n as i32 {
                    continue;
                }
                let nr = nr as usize;
                let nc = nc as usize;
                let ch = bytes[nr][nc];
                if ch == b'#' {
                    continue;
                }
                if (b'A'..=b'F').contains(&ch) && mask & (1usize << (ch - b'A') as usize) == 0 {
                    continue;
                }
                let mut nmask = mask;
                if (b'a'..=b'f').contains(&ch) {
                    nmask |= 1usize << (ch - b'a') as usize;
                }
                let idx = (nr * n + nc) * size + nmask;
                if dist[idx] == -1 {
                    dist[idx] = d + 1;
                    queue.push_back((nr, nc, nmask));
                }
            }
        }
        -1
    }
}
