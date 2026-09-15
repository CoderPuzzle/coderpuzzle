use std::collections::HashMap;

impl Solution {
    pub fn find_good_integers(n: i32) -> Vec<i32> {
        // Compute cubes in i64 so every intermediate follows the 64-bit law.
        let mut limit: i64 = 0;
        while (limit + 1) * (limit + 1) * (limit + 1) <= n as i64 {
            limit += 1;
        }
        let cubes: Vec<i64> = (0..=limit).map(|value| value * value * value).collect();
        let mut counts: HashMap<i64, i32> = HashMap::new();
        for a in 1..=limit as usize {
            if cubes[a] + cubes[a] > n as i64 {
                break;
            }
            for b in a..=limit as usize {
                let total = cubes[a] + cubes[b];
                if total > n as i64 {
                    break;
                }
                *counts.entry(total).or_insert(0) += 1;
            }
        }
        let mut result: Vec<i32> = counts
            .into_iter()
            .filter_map(|(total, count)| (count >= 2).then_some(total as i32))
            .collect();
        result.sort_unstable();
        result
    }
}
