use std::collections::HashMap;

impl Solution {
    pub fn count_pairs(coordinates: Vec<Vec<i32>>, k: i32) -> i32 {
        let mut total = 0_i32;
        let mut seen: HashMap<i64, i32> = HashMap::new();
        for point in coordinates {
            let key = ((point[0] as i64) << 20) | (point[1] as i64);
            for split in 0..=k {
                let probe = key ^ (((split as i64) << 20) | ((k - split) as i64));
                if let Some(count) = seen.get(&probe) {
                    total += count;
                }
            }
            *seen.entry(key).or_insert(0) += 1;
        }
        total
    }
}
