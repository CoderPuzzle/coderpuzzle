use std::collections::HashMap;

impl Solution {
    pub fn share_candies(candies: Vec<i32>, k: i32) -> i32 {
        let k = k as usize;
        let mut counts = HashMap::new();
        for &flavor in &candies {
            *counts.entry(flavor).or_insert(0_i32) += 1;
        }
        let mut distinct = counts.len() as i32;
        for &flavor in &candies[..k] {
            let count = counts.get_mut(&flavor).unwrap();
            *count -= 1;
            if *count == 0 {
                distinct -= 1;
            }
        }

        let mut answer = distinct;
        for right in k..candies.len() {
            let restored = candies[right - k];
            let count = counts.get_mut(&restored).unwrap();
            if *count == 0 {
                distinct += 1;
            }
            *count += 1;

            let removed = candies[right];
            let count = counts.get_mut(&removed).unwrap();
            *count -= 1;
            if *count == 0 {
                distinct -= 1;
            }
            answer = answer.max(distinct);
        }
        answer
    }
}
