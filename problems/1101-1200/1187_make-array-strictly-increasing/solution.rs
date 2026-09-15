use std::collections::HashMap;

impl Solution {
    pub fn make_array_increasing(arr1: Vec<i32>, arr2: Vec<i32>) -> i32 {
        let mut b = arr2.clone();
        b.sort_unstable();
        b.dedup();
        let m = b.len();

        // dp: strictly increasing prefix whose last value is v -> min ops.
        // keeping arr1[0] costs 0; any smaller replacement costs 1 (larger
        // replacements are dominated by keeping)
        let mut dp: HashMap<i64, i64> = HashMap::new();
        dp.insert(arr1[0] as i64, 0);
        for &v in &b {
            if (v as i64) < arr1[0] as i64 {
                dp.insert(v as i64, 1);
            }
        }

        for i in 1..arr1.len() {
            let mut ndp: HashMap<i64, i64> = HashMap::new();
            for (&last, &ops) in dp.iter() {
                // keep arr1[i] when it strictly exceeds last: no cost
                if arr1[i] as i64 > last {
                    let cur = ndp.get(&(arr1[i] as i64)).copied();
                    if cur.is_none() || cur.unwrap() > ops {
                        ndp.insert(arr1[i] as i64, ops);
                    }
                }
                // replace with the smallest arr2 value > last: the smallest
                // choice leaves the most room for what follows; costs 1 op
                let idx = b.partition_point(|&x| (x as i64) <= last);
                if idx < m {
                    let v = b[idx] as i64;
                    let cost = ops + 1;
                    let cur = ndp.get(&v).copied();
                    if cur.is_none() || cur.unwrap() > cost {
                        ndp.insert(v, cost);
                    }
                }
            }
            dp = ndp;
            // no state survives: a strictly increasing arrangement is impossible
            if dp.is_empty() {
                return -1;
            }
        }

        *dp.values().min().unwrap() as i32
    }
}
