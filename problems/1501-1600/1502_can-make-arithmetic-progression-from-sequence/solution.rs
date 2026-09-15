impl Solution {
    // Sorting produces the one arrangement that could possibly be a valid
    // progression; check its consecutive gaps are all equal.
    pub fn can_make_arithmetic_progression(arr: Vec<i32>) -> bool {
        let mut a = arr;
        a.sort();
        let diff = a[1] as i64 - a[0] as i64;
        for i in 2..a.len() {
            if a[i] as i64 - a[i - 1] as i64 != diff {
                return false;
            }
        }
        true
    }
}
