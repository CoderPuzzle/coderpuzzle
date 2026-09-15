impl Solution {
    pub fn distribute_cookies(cookies: Vec<i32>, k: i32) -> i32 {
        let k = k as usize;
        let mut children = vec![0i64; k];
        // i64::MAX start guarantees the first complete leaf always improves
        let mut best = i64::MAX;
        Self::backtrack(&cookies, &mut children, 0, 0, &mut best);
        best as i32
    }

    fn backtrack(cookies: &[i32], children: &mut Vec<i64>, i: usize, cur_max: i64, best: &mut i64) {
        // bound pruning: the running max only grows, so this branch can no
        // longer beat the best complete distribution found so far
        if cur_max >= *best {
            return;
        }
        // all bags placed: the running max is this leaf's unfairness
        if i == cookies.len() {
            *best = cur_max;
            return;
        }
        let mut tried: std::collections::HashSet<i64> = std::collections::HashSet::new();
        for j in 0..children.len() {
            // symmetry: children holding equal totals are interchangeable,
            // so try each distinct total only once
            if tried.contains(&children[j]) {
                continue;
            }
            tried.insert(children[j]);
            children[j] += cookies[i] as i64;
            let nm = cur_max.max(children[j]);
            Self::backtrack(cookies, children, i + 1, nm, best);
            children[j] -= cookies[i] as i64;
        }
    }
}
