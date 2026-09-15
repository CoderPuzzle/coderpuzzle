impl Solution {
    pub fn orderly_queue(s: String, k: i32) -> String {
        // A move lifts one of the first k letters to the end. With k = 1
        // the only liftable letter is the very first, so every move is a
        // plain rotation and the answer is the smallest rotation of s:
        // try each cut. With k >= 2 one of the two front letters is never
        // the smallest still waiting, so a non-smallest one can always be
        // parked at the back while the smallest walks forward — every
        // ordering becomes reachable and the answer is the sorted string.
        if k >= 2 {
            let mut letters = s.into_bytes();
            letters.sort_unstable();
            return String::from_utf8(letters).expect("letters are ASCII");
        }
        let n = s.len();
        let mut best = s.clone();
        for i in 1..n {
            let candidate = format!("{}{}", &s[i..], &s[..i]);
            if candidate < best {
                best = candidate;
            }
        }
        best
    }
}
