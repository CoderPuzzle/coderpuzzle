impl Solution {
    pub fn num_of_subarrays(arr: Vec<i32>, k: i32, threshold: i32) -> i32 {
        // window_sum >= k * threshold is the exact integer form of
        // "average >= threshold"; the window updates in O(1) per slide.
        let k = k as usize;
        let need = (k as i64) * threshold as i64;
        let mut window: i64 = arr.iter().take(k).map(|v| *v as i64).sum();
        let mut count = if window >= need { 1 } else { 0 };
        for i in k..arr.len() {
            window += arr[i] as i64 - arr[i - k] as i64;
            if window >= need {
                count += 1;
            }
        }
        count
    }
}
