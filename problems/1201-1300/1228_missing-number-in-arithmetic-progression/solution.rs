impl Solution {
    pub fn missing_number(arr: Vec<i32>) -> i32 {
        // Endpoints survive, so the full progression had arr.len()+1 terms
        // from arr[0] to arr[-1]; the gap between its Gauss sum and the
        // surviving sum is the removed value.
        let n = arr.len() as i64;
        let full = (arr[0] as i64 + arr[arr.len() - 1] as i64) * (n + 1) / 2;
        let sum: i64 = arr.iter().map(|&v| v as i64).sum();
        (full - sum) as i32
    }
}
