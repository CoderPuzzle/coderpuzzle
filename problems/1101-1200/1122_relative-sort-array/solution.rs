use std::collections::HashMap;

impl Solution {
    pub fn relative_sort_array(arr1: Vec<i32>, arr2: Vec<i32>) -> Vec<i32> {
        // Rank in arr2 for present values; absent ones share the sentinel
        // rank arr2.len() and then compare by value (ascending at the end).
        let mut rank: HashMap<i32, i32> = HashMap::new();
        for (index, value) in arr2.iter().enumerate() {
            rank.insert(*value, index as i32);
        }
        let tail = arr2.len() as i32;
        let key = |value: i32| -> i32 {
            let r = rank.get(&value).copied().unwrap_or(tail);
            r * 2000 + value // ranks < 1000, values <= 1000 < 2000
        };
        let mut out = arr1;
        out.sort_by_key(|&value| key(value));
        out
    }
}
