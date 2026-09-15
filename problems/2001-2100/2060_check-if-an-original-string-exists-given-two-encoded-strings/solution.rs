use std::collections::HashMap;

impl Solution {
    pub fn possibly_equals(s1: String, s2: String) -> bool {
        Self::search(0, 0, 0, s1.as_bytes(), s2.as_bytes(), &mut HashMap::new())
    }

    fn search(
        i: usize,
        j: usize,
        difference: i32,
        s1: &[u8],
        s2: &[u8],
        memo: &mut HashMap<(usize, usize, i32), bool>,
    ) -> bool {
        let state = (i, j, difference);
        if let Some(&answer) = memo.get(&state) {
            return answer;
        }
        if i == s1.len() && j == s2.len() {
            return difference == 0;
        }

        if i < s1.len() && s1[i].is_ascii_digit() {
            let mut value = 0;
            for end in i..(i + 3).min(s1.len()) {
                if !s1[end].is_ascii_digit() {
                    break;
                }
                value = value * 10 + (s1[end] - b'0') as i32;
                if Self::search(end + 1, j, difference + value, s1, s2, memo) {
                    memo.insert(state, true);
                    return true;
                }
            }
        }

        if j < s2.len() && s2[j].is_ascii_digit() {
            let mut value = 0;
            for end in j..(j + 3).min(s2.len()) {
                if !s2[end].is_ascii_digit() {
                    break;
                }
                value = value * 10 + (s2[end] - b'0') as i32;
                if Self::search(i, end + 1, difference - value, s1, s2, memo) {
                    memo.insert(state, true);
                    return true;
                }
            }
        }

        let answer = if difference > 0 && j < s2.len() && s2[j].is_ascii_lowercase() {
            Self::search(i, j + 1, difference - 1, s1, s2, memo)
        } else if difference < 0 && i < s1.len() && s1[i].is_ascii_lowercase() {
            Self::search(i + 1, j, difference + 1, s1, s2, memo)
        } else if difference == 0
            && i < s1.len()
            && j < s2.len()
            && s1[i].is_ascii_lowercase()
            && s2[j].is_ascii_lowercase()
            && s1[i] == s2[j]
        {
            Self::search(i + 1, j + 1, 0, s1, s2, memo)
        } else {
            false
        };
        memo.insert(state, answer);
        answer
    }
}
