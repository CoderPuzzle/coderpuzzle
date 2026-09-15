impl Solution {
    pub fn find_special_integer(arr: Vec<i32>) -> i32 {
        // A value covering more than a quarter of the array must span at
        // least one of the positions n/4, n/2, 3n/4 (a run longer than n/4
        // cannot fit between two consecutive quarter marks). Each candidate
        // is verified by binary-searching its first and last occurrence.
        let n = arr.len();
        for probe in [n / 4, n / 2, 3 * n / 4] {
            let candidate = arr[probe];
            let lo = arr.partition_point(|&v| v < candidate);
            let hi = arr.partition_point(|&v| v <= candidate);
            if hi - lo > n / 4 {
                return candidate;
            }
        }
        arr[n - 1]
    }
}
