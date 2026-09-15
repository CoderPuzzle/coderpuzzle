impl Solution {
    pub fn can_arrange(arr: Vec<i32>, k: i32) -> bool {
        let k = k as usize;
        let mut freq = vec![0i64; k];
        for &x in &arr {
            let r = x.rem_euclid(k as i32) as usize;
            freq[r] += 1;
        }
        // the zero class must pair within itself -> even count
        if freq[0] % 2 != 0 {
            return false;
        }
        // complementary classes r and k-r must match exactly (any pairing
        // inside matched classes works, so counts alone decide)
        for i in 1..=(k / 2) {
            if freq[i] != freq[k - i] {
                return false;
            }
        }
        true
    }
}
