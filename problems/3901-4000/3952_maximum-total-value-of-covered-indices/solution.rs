impl Solution {
    pub fn max_total(a: Vec<i32>, s: String) -> i64 {
        let s = s.as_bytes();
        let (mut ans, mut i) = (0i64, 0);
        while i < a.len() {
            if s[i] == b'0' {
                i += 1;
                continue;
            }
            let l = i;
            let (mut z, mut m) = (0i64, i32::MAX);
            while i < a.len() && s[i] == b'1' {
                z += a[i] as i64;
                m = m.min(a[i]);
                i += 1;
            }
            ans += if l == 0 {
                z
            } else {
                z + a[l - 1] as i64 - m.min(a[l - 1]) as i64
            };
        }
        ans
    }
}
