use std::collections::HashMap;

impl Solution {
    pub fn avoid_flood(rains: Vec<i64>) -> Vec<i64> {
        let n = rains.len();
        let mut zeros: Vec<usize> = Vec::new();
        let mut last: HashMap<i64, usize> = HashMap::new();
        let mut ans = vec![-1i64; n];
        for i in 0..n {
            let r = rains[i];
            if r == 0 {
                ans[i] = 1;
                let pos = zeros.partition_point(|&day| day <= i);
                zeros.insert(pos, i);
            } else if let Some(&prev) = last.get(&r) {
                let pos = zeros.partition_point(|&day| day <= prev);
                if pos == zeros.len() || zeros[pos] >= i {
                    return Vec::new();
                }
                ans[zeros[pos]] = r;
                zeros.remove(pos);
                last.insert(r, i);
            } else {
                last.insert(r, i);
            }
        }
        ans
    }
}
