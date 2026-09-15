impl Solution {
    pub fn sum_odd_length_subarrays(arr: Vec<i32>) -> i32 {
        // For each index i, left = i + 1 choices for the subarray's start
        // and right = n - i choices for its end; among those left * right
        // subarrays through i, exactly ceil(left * right / 2) have odd
        // length. Sum arr[i] times that count over every index.
        let n = arr.len() as i32;
        let mut total: i32 = 0;
        for (idx, &value) in arr.iter().enumerate() {
            let left = idx as i32 + 1;
            let right = n - idx as i32;
            let odd_count = (left * right + 1) / 2;
            total += value * odd_count;
        }
        total
    }
}
