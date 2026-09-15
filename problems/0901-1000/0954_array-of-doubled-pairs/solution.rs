use std::collections::HashMap;

impl Solution {
    pub fn can_reorder_doubled(arr: Vec<i32>) -> bool {
        // A pair is (x, 2x), so the value of smallest absolute value has no
        // choice: its half is smaller in magnitude and cannot be waiting for
        // it, so every copy must claim a double. Walk the distinct values in
        // ascending absolute value, carrying each value's unclaimed copies
        // forward as a demand on its double; a demand that outruns the
        // supply, or aims at a value the array never held, makes the
        // pairing impossible. Zero is its own double, so its count must be
        // even.
        let mut count: HashMap<i32, i32> = HashMap::new();
        for &value in arr.iter() {
            *count.entry(value).or_insert(0) += 1;
        }
        let mut values: Vec<i32> = count.keys().copied().collect();
        values.sort_by_key(|&value| value.abs());
        let mut need: HashMap<i32, i32> = HashMap::new();
        for value in values {
            if value == 0 {
                if count[&0] % 2 != 0 {
                    return false;
                }
                continue;
            }
            let demanded = need.get(&value).copied().unwrap_or(0);
            if demanded > count[&value] {
                return false;
            }
            let extra = count[&value] - demanded;
            if extra > 0 && !count.contains_key(&(2 * value)) {
                return false;
            }
            *need.entry(2 * value).or_insert(0) += extra;
        }
        true
    }
}
