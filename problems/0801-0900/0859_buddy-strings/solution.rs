impl Solution {
    // A swap moves exactly two letters, so it changes two positions of s or,
    // when the letters are equal, nothing at all. Count the positions where
    // s and goal disagree: exactly two that cross, or none with a repeated
    // letter to trade.
    pub fn buddy_strings(s: String, goal: String) -> bool {
        if s.len() != goal.len() {
            return false;
        }
        let (s, goal) = (s.as_bytes(), goal.as_bytes());
        let (mut first, mut second) = (-1isize, -1isize);
        for i in 0..s.len() {
            if s[i] != goal[i] {
                if first < 0 {
                    first = i as isize;
                } else if second < 0 {
                    second = i as isize;
                } else {
                    return false;
                }
            }
        }
        if second >= 0 {
            return s[first as usize] == goal[second as usize] && s[second as usize] == goal[first as usize];
        }
        if first >= 0 {
            return false;
        }
        let mut seen = [false; 26];
        for &b in s {
            let k = (b - b'a') as usize;
            if seen[k] {
                return true;
            }
            seen[k] = true;
        }
        false
    }
}
