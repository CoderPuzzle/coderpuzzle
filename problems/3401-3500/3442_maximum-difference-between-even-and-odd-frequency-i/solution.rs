impl Solution {
    // To maximize freq(a1) - freq(a2), take the largest odd frequency and
    // the smallest even one; one counting pass decides both.
    pub fn max_difference(s: String) -> i32 {
        let mut freq = [0i32; 26];
        for b in s.bytes() {
            freq[(b - b'a') as usize] += 1;
        }
        let mut odd = -1;
        let mut even = 101;
        for &f in &freq {
            if f == 0 {
                continue;
            }
            if f & 1 == 1 {
                odd = odd.max(f);
            } else {
                even = even.min(f);
            }
        }
        odd - even
    }
}
