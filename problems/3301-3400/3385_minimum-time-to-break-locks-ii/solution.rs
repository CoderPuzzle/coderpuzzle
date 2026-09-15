impl Solution {
    // The k-th lock broken (1-indexed) is charged at factor k: its energy
    // grows by k each minute from 0, so it breaks after exactly
    // ceil(strength / k) minutes. Waiting longer never helps, and X
    // depends only on how many locks are already broken, so the total
    // time is sum over k of ceil(strength[order[k]] / k), minimized over
    // all break orders — a minimum-cost perfect matching between locks
    // and positions, solved by the O(n^3) Hungarian algorithm with
    // potentials.
    pub fn find_minimum_time(strength: Vec<i32>) -> i32 {
        let n = strength.len();
        let mut cost = vec![vec![0i64; n]; n];
        for i in 0..n {
            for k in 0..n {
                cost[i][k] = ((strength[i] as i64) + k as i64) / (k as i64 + 1);
            }
        }
        let inf = 1i64 << 60;
        let mut u = vec![0i64; n + 1];
        let mut v = vec![0i64; n + 1];
        let mut p = vec![0usize; n + 1]; // p[j] = 1-indexed row matched to column j
        let mut way = vec![0usize; n + 1];
        for i in 1..=n {
            p[0] = i;
            let mut j0 = 0usize;
            let mut minv = vec![inf; n + 1];
            let mut used = vec![false; n + 1];
            loop {
                used[j0] = true;
                let i0 = p[j0];
                let mut delta = inf;
                let mut j1 = 0usize;
                for j in 1..=n {
                    if !used[j] {
                        let cur = cost[i0 - 1][j - 1] - u[i0] - v[j];
                        if cur < minv[j] {
                            minv[j] = cur;
                            way[j] = j0;
                        }
                        if minv[j] < delta {
                            delta = minv[j];
                            j1 = j;
                        }
                    }
                }
                for j in 0..=n {
                    if used[j] {
                        u[p[j]] += delta;
                        v[j] -= delta;
                    } else {
                        minv[j] -= delta;
                    }
                }
                j0 = j1;
                if p[j0] == 0 {
                    break;
                }
            }
            while j0 > 0 {
                let j1 = way[j0];
                p[j0] = p[j1];
                j0 = j1;
            }
        }
        let mut total = 0i64;
        for j in 1..=n {
            total += cost[p[j] - 1][j - 1];
        }
        total as i32
    }
}
