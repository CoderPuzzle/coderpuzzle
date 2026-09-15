impl Solution {
    fn consec(a: u8, b: u8) -> bool {
        let d = (a as i32 - b as i32).abs();
        d == 1 || d == 25 // 'a'-'z' are consecutive (circular)
    }

    pub fn lexicographically_smallest_string(s: String) -> String {
        let bytes = s.as_bytes();
        let n = bytes.len();
        if n <= 1 {
            return s;
        }

        // rem[i][j] = can s[i..j] be removed entirely
        let mut rem = vec![vec![false; n]; n];
        for length in 2..=n {
            for i in 0..=(n - length) {
                let j = i + length - 1;
                for k in i..j {
                    if rem[i][k] && rem[k + 1][j] {
                        rem[i][j] = true;
                        break;
                    }
                }
                if !rem[i][j] && Self::consec(bytes[i], bytes[j]) {
                    if length == 2 || rem[i + 1][j - 1] {
                        rem[i][j] = true;
                    }
                }
            }
        }

        let mut ans: Vec<String> = vec![String::new(); n + 1];
        ans[n] = String::new();
        for i in (0..n).rev() {
            let mut best: Option<String> = None;
            for j in i..=n {
                if j > i && !rem[i][j - 1] {
                    continue;
                }
                let cand = if j < n {
                    let mut c = String::with_capacity(1 + ans[j + 1].len());
                    c.push(bytes[j] as char);
                    c.push_str(&ans[j + 1]);
                    c
                } else {
                    String::new()
                };
                match &best {
                    None => best = Some(cand),
                    Some(b) if cand < *b => best = Some(cand),
                    _ => {}
                }
            }
            ans[i] = best.unwrap();
        }
        ans[0].clone()
    }
}
