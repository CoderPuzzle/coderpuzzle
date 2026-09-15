use std::collections::HashMap;

impl Solution {
    pub fn array_rank_transform(arr: Vec<i32>) -> Vec<i32> {
        // Rank = position in the sorted distinct values, 1-based; the map is
        // then applied in input order so the output preserves positions.
        let mut distinct = arr.clone();
        distinct.sort_unstable();
        distinct.dedup();
        let mut ranks: HashMap<i32, i32> = HashMap::with_capacity(distinct.len());
        for (index, value) in distinct.iter().enumerate() {
            ranks.insert(*value, index as i32 + 1);
        }
        arr.iter().map(|value| ranks[value]).collect()
    }
}
