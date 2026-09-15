use std::collections::HashMap;

impl Solution {
    pub fn recover_array(n: i32, sums: Vec<i32>) -> Vec<i32> {
        let mut cur = sums;
        cur.sort_unstable();
        let mut res: Vec<i32> = Vec::new();
        while cur.len() > 1 {
            let m = cur.len();
            let diff = cur[m - 1] - cur[m - 2];
            let mut cnt: HashMap<i32, i32> = HashMap::with_capacity(m);
            for &x in &cur {
                *cnt.entry(x).or_insert(0) += 1;
            }
            let mut left: Vec<i32> = Vec::with_capacity(m / 2);
            let mut right: Vec<i32> = Vec::with_capacity(m / 2);
            for &x in &cur {
                let c = cnt.get(&x).copied().unwrap_or(0);
                if c > 0 {
                    cnt.insert(x, c - 1);
                    left.push(x);
                    let e = cnt.entry(x + diff).or_insert(0);
                    *e -= 1;
                    right.push(x + diff);
                }
            }
            let zero_in_left = left.contains(&0);
            if zero_in_left {
                res.push(diff);
                cur = left;
            } else {
                res.push(-diff);
                cur = right;
            }
        }
        res
    }
}
