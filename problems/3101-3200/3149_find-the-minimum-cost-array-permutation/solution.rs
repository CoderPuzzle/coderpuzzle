impl Solution {
    pub fn find_permutation(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let full = (1usize << n) - 1;
        let inf = i64::MAX / 4;

        let absd = |a: i64| -> i64 { a.abs() };

        // f[mask][last] = min additional cost to visit all elements not in
        // mask, starting from `last`, including the closing edge to nums[0]
        let mut f = vec![vec![inf; n]; 1 << n];
        for last in 0..n {
            f[full][last] = absd(last as i64 - nums[0] as i64);
        }
        for mask in (1..full).rev() {
            for last in 0..n {
                if (mask >> last) & 1 == 0 {
                    continue;
                }
                let mut best = inf;
                for nxt in 0..n {
                    if (mask >> nxt) & 1 != 0 {
                        continue;
                    }
                    let cost = absd(last as i64 - nums[nxt] as i64) + f[mask | (1 << nxt)][nxt];
                    if cost < best {
                        best = cost;
                    }
                }
                f[mask][last] = best;
            }
        }

        // greedy reconstruction: smallest next element keeping the cost optimal
        let mut perm: Vec<i32> = vec![0];
        let mut mask = 1usize;
        let mut last = 0usize;
        for _step in 1..n {
            for nxt in 0..n {
                if (mask >> nxt) & 1 != 0 {
                    continue;
                }
                if absd(last as i64 - nums[nxt] as i64) + f[mask | (1 << nxt)][nxt] == f[mask][last] {
                    perm.push(nxt as i32);
                    mask |= 1 << nxt;
                    last = nxt;
                    break;
                }
            }
        }
        perm
    }
}
