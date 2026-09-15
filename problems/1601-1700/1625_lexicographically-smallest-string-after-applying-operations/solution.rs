use std::collections::HashSet;
use std::collections::VecDeque;

impl Solution {
    pub fn find_lex_smallest_string(s: String, a: i32, b: i32) -> String {
        let n = s.len();
        let b = b as usize;
        let mut seen: HashSet<String> = HashSet::new();
        seen.insert(s.clone());
        let mut queue: VecDeque<String> = VecDeque::new();
        queue.push_back(s.clone());
        let mut best = s;

        while let Some(cur) = queue.pop_front() {
            if cur < best {
                best = cur.clone();
            }

            let mut digits: Vec<u8> = cur.bytes().collect();
            let mut i = 1;
            while i < n {
                let value = ((digits[i] - b'0') as i32 + a) % 10;
                digits[i] = b'0' + value as u8;
                i += 2;
            }
            let added = String::from_utf8(digits).unwrap();
            if seen.insert(added.clone()) {
                queue.push_back(added);
            }

            let rotated = format!("{}{}", &cur[n - b..], &cur[..n - b]);
            if seen.insert(rotated.clone()) {
                queue.push_back(rotated);
            }
        }

        best
    }
}
