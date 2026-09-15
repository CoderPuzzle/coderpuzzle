impl Solution {
    pub fn find_anagrams(s: String, p: String) -> Vec<i32> {
        let s = s.as_bytes();
        let p = p.as_bytes();
        let length = p.len();
        let n = s.len();
        let mut result: Vec<i32> = Vec::new();
        if n < length {
            return result;
        }
        let mut delta = [0i32; 128];
        for &ch in p {
            delta[ch as usize] += 1;
        }
        let mut diff = delta.iter().filter(|&&d| d != 0).count() as i32;
        for i in 0..n {
            let c = s[i] as usize;
            if delta[c] == 0 {
                diff += 1;
            }
            delta[c] -= 1;
            if delta[c] == 0 {
                diff -= 1;
            }
            if i >= length {
                let out = s[i - length] as usize;
                if delta[out] == 0 {
                    diff += 1;
                }
                delta[out] += 1;
                if delta[out] == 0 {
                    diff -= 1;
                }
            }
            if i + 1 >= length && diff == 0 {
                result.push((i + 1 - length) as i32);
            }
        }
        result
    }
}
