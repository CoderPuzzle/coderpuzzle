use std::collections::BTreeMap;

impl Solution {
    // A BTreeMap keyed by value accumulates weights from both lists and
    // iterates in ascending value order for free.
    pub fn merge_similar_items(items1: Vec<Vec<i32>>, items2: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let mut weights: BTreeMap<i32, i32> = BTreeMap::new();
        for items in [items1, items2] {
            for item in items {
                *weights.entry(item[0]).or_insert(0) += item[1];
            }
        }
        weights.into_iter().map(|(value, weight)| vec![value, weight]).collect()
    }
}
