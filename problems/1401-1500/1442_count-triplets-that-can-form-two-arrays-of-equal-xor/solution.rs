use std::collections::HashMap;

impl Solution {
    pub fn count_triplets(arr: Vec<i32>) -> i32 {
        let mut count: HashMap<i32, i64> = HashMap::new();
        let mut index_sum: HashMap<i32, i64> = HashMap::new();
        // per prefix value: occurrence count and sum of (index+1); seeded
        // with the empty prefix so segments starting at index 0 count too
        count.insert(0, 1);
        index_sum.insert(0, 0);
        let mut prefix = 0i32;
        let mut answer = 0i64;
        for (j, &value) in arr.iter().enumerate() {
            prefix ^= value;
            // equal prefixes at p < j => arr[p+1..j] XORs to 0 and every
            // internal split works: sum over such p of (j - p - 1)
            // telescopes to j * count - index_sum
            if let Some(&c) = count.get(&prefix) {
                answer += j as i64 * c - index_sum[&prefix];
                count.insert(prefix, c + 1);
                index_sum.insert(prefix, index_sum[&prefix] + j as i64 + 1);
            } else {
                count.insert(prefix, 1);
                index_sum.insert(prefix, j as i64 + 1);
            }
        }
        answer as i32
    }
}
