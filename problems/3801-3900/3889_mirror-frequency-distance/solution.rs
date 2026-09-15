impl Solution {
    pub fn mirror_frequency(s: String) -> i32 {
        // 36 counters: 26 letters, then 10 digits.
        let mut freq = vec![0i32; 36];
        for &b in s.as_bytes() {
            if (b'a'..=b'z').contains(&b) {
                freq[(b - b'a') as usize] += 1;
            } else {
                freq[26 + (b - b'0') as usize] += 1;
            }
        }
        let mut total = 0;
        // Letters fold into 13 mirror pairs (a,z), (b,y), ..., (m,n).
        for i in 0..13 {
            let a = freq[i];
            let b = freq[25 - i];
            if a + b > 0 {
                total += (a - b).abs();
            }
        }
        // Digits fold into 5 mirror pairs (0,9), (1,8), ..., (4,5).
        for d in 0..5 {
            let a = freq[26 + d];
            let b = freq[26 + 9 - d];
            if a + b > 0 {
                total += (a - b).abs();
            }
        }
        total
    }
}
