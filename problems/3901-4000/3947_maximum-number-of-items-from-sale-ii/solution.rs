impl Solution {
    pub fn maximum_sale_items(a: Vec<Vec<i32>>, budget: i32) -> i64 {
        let n = a.len();
        let mut f = vec![0; n + 1];
        let mut d = vec![0; n + 1];
        for x in &a {
            f[x[0] as usize] += 1;
        }
        for z in 1..=n {
            for x in (z..=n).step_by(z) {
                d[z] += f[x];
            }
        }
        let cheap = *a.iter().map(|x| &x[1]).min().unwrap() as i64;
        let mut q: Vec<(i64, i64)> = a.iter().map(|x| (x[1] as i64, (d[x[0] as usize] - 1) as i64)).collect();
        q.sort_unstable();
        let (mut best, mut spent, mut boost) = (budget as i64 / cheap, 0, 0);
        for (p, cap) in q {
            if p > 2 * cheap || cap == 0 {
                continue;
            }
            let take = cap.min((budget as i64 - spent) / p);
            spent += take * p;
            boost += take;
            best = best.max(2 * boost + (budget as i64 - spent) / cheap);
            if take < cap {
                break;
            }
        }
        best
    }
}
