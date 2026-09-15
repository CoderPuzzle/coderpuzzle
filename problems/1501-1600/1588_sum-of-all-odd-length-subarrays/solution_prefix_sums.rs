impl Solution {
    pub fn sum_odd_length_subarrays(arr: Vec<i32>) -> i32 {
        // Every window sum is a difference of two prefix sums: with P[0] = 0, the
        // window [l, r] contributes P[r + 1] - P[l] to the total. Instead of
        // summing window by window, collect each prefix entry's coefficient: P[k]
        // is added once per odd window ending at k - 1, floor((k + 1) / 2) of
        // them, and subtracted once per odd window starting at k, of which there
        // are floor((n - k + 1) / 2), zero when k = n. One linear pass over the
        // prefix array therefore collapses the whole series.
        let n = arr.len() as i32;
        let mut prefix = vec![0; arr.len() + 1];
        for (i, &value) in arr.iter().enumerate() {
            prefix[i + 1] = prefix[i] + value;
        }
        let mut total: i32 = 0;
        for k in 1..=n {
            let coef = (k + 1) / 2 - (n - k + 1) / 2;
            total += coef * prefix[k as usize];
        }
        total
    }
}
