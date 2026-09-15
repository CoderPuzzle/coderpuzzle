impl Solution {
    pub fn trim_mean(arr: Vec<i32>) -> f64 {
        let mut a = arr.clone();
        a.sort();
        let n = a.len();
        let trim = n / 20; // 5% of n, always a whole number since n is a multiple of 20
        let kept = &a[trim..n - trim];
        kept.iter().map(|&v| v as f64).sum::<f64>() / kept.len() as f64
    }
}
