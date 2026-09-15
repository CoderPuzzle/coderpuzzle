impl Solution {
    pub fn possible_string_count(word: String) -> i32 {
        // The long press, if it happened, extended exactly one run of
        // equal characters: the intended string kept r copies and the
        // held key added the remaining L - r. A run of length L >= 2
        // therefore admits L - 1 shorter intended lengths, and since the
        // slip happened at most once these alternatives never combine.
        // The count is 1 (nothing was mistyped) plus one per position
        // whose character repeats the previous one.
        let w = word.as_bytes();
        let mut count = 1i32;
        for i in 1..w.len() {
            if w[i] == w[i - 1] {
                count += 1;
            }
        }
        count
    }
}
