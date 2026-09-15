impl Solution {
    pub fn find_diagonal_order(nums: Vec<Vec<i32>>) -> Vec<i32> {
        let mut buckets: Vec<Vec<i32>> = Vec::new();
        for (i, row) in nums.iter().enumerate() {
            for (j, &value) in row.iter().enumerate() {
                let key = i + j;
                if buckets.len() <= key {
                    buckets.resize(key + 1, Vec::new());
                }
                buckets[key].push(value);
            }
        }
        let mut result = Vec::new();
        for bucket in &buckets {
            result.extend(bucket.iter().rev());
        }
        result
    }
}
