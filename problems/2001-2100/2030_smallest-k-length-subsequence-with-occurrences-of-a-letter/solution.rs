impl Solution {
    pub fn smallest_subsequence(s: String, k: i32, letter: String, repetition: i32) -> String {
        let s = s.as_bytes();
        let n = s.len();
        let target = letter.as_bytes()[0];
        let k = k as usize;
        let repetition = repetition as i64;
        // suffix[i] = number of `letter` occurrences in s[i:]
        let mut suffix = vec![0i64; n + 1];
        for i in (0..n).rev() {
            suffix[i] = suffix[i + 1] + if s[i] == target { 1 } else { 0 };
        }

        let mut stack: Vec<u8> = Vec::with_capacity(n);
        let mut used: i64 = 0; // number of `letter` currently in the stack
        for i in 0..n {
            let ch = s[i];
            while let Some(&top) = stack.last() {
                if top <= ch {
                    break;
                }
                if stack.len() as i64 - 1 + ((n - i) as i64) < k as i64 {
                    break;
                }
                let mut letters_after_pop = used - if top == target { 1 } else { 0 };
                letters_after_pop += if ch == target { 1 } else { 0 };
                if letters_after_pop + suffix[i + 1] < repetition {
                    break;
                }
                stack.pop();
                if top == target {
                    used -= 1;
                }
            }
            stack.push(ch);
            if ch == target {
                used += 1;
            }
        }

        // Trim to exactly length k from the right, never dropping below
        // `repetition` target letters.
        let mut remove = stack.len() as i64 - k as i64;
        let mut letters_in_stack = used;
        let mut res: Vec<u8> = Vec::with_capacity(k);
        for &ch in stack.iter().rev() {
            if remove == 0 {
                res.push(ch);
            } else if ch == target {
                if letters_in_stack - 1 >= repetition {
                    letters_in_stack -= 1;
                    remove -= 1;
                } else {
                    res.push(ch);
                }
            } else {
                remove -= 1;
            }
        }
        res.reverse();
        String::from_utf8(res).unwrap()
    }
}
