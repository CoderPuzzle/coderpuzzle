impl Solution {
    pub fn kth_smallest_prime_fraction(arr: Vec<i32>, k: i32) -> Vec<i32> {
        let n = arr.len();
        let mut lo: f64 = 0.0;
        let mut hi: f64 = 1.0;
        let mut ans: Vec<i32> = vec![arr[0], arr[n - 1]];
        // Binary search on the fraction value; count fractions <= mid.
        for _ in 0..50 {
            let mid = (lo + hi) / 2.0;
            let mut count: i32 = 0;
            let mut best: f64 = 0.0;
            let mut best_pair: (i32, i32) = (arr[0], arr[n - 1]);
            let mut j: usize = 1;
            for i in 0..n - 1 {
                while j < n && (arr[i] as f64) > mid * (arr[j] as f64) {
                    j += 1;
                }
                count += (n - j) as i32;
                if j < n {
                    let val = arr[i] as f64 / arr[j] as f64;
                    if val > best {
                        best = val;
                        best_pair = (arr[i], arr[j]);
                    }
                }
            }
            if count >= k {
                hi = mid;
                ans = vec![best_pair.0, best_pair.1];
            } else {
                lo = mid;
            }
        }
        ans
    }
}
