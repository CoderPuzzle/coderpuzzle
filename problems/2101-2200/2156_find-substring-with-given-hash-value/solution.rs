impl Solution {
    pub fn sub_str_hash(s: String, power: i32, modulo: i32, k: i32, hash_value: i32) -> String {
        let s = s.as_bytes();
        let n = s.len() as i64;
        let k = k as i64;
        let p = power as i64;
        let m = modulo as i64;
        let val = |i: i64| (s[i as usize] - b'a' + 1) as i64;

        // Hash of the rightmost window, then roll leftwards.
        let mut cur = 0i64;
        let mut pw = 1i64;
        for j in 0..k {
            cur = (cur + val(n - k + j) * pw) % m;
            pw = pw * p % m;
        }
        let mut top = 1i64;
        for _ in 0..(k - 1) {
            top = top * p % m;
        }
        let mut answer = if cur == hash_value as i64 {
            String::from_utf8(s[(n - k) as usize..].to_vec()).unwrap()
        } else {
            String::new()
        };
        let mut i = n - k - 1;
        while i >= 0 {
            cur = (((cur - val(i + k) * top % m + m) % m) * p + val(i)) % m;
            if cur == hash_value as i64 {
                // scanning right-to-left keeps the leftmost match
                answer = String::from_utf8(s[i as usize..(i + k) as usize].to_vec()).unwrap();
            }
            i -= 1;
        }
        answer
    }
}
