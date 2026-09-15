use std::collections::HashSet;

impl Solution {
    pub fn people_indexes(favorite_companies: Vec<Vec<String>>) -> Vec<i32> {
        let sets: Vec<HashSet<&str>> = favorite_companies
            .iter()
            .map(|companies| companies.iter().map(|c| c.as_str()).collect())
            .collect();
        let mut result = Vec::new();
        for (i, small) in sets.iter().enumerate() {
            let mut covered = false;
            for (j, big) in sets.iter().enumerate() {
                if i == j || big.len() <= small.len() {
                    continue;
                }
                if small.iter().all(|company| big.contains(company)) {
                    covered = true;
                    break;
                }
            }
            if !covered {
                result.push(i as i32);
            }
        }
        result
    }
}
