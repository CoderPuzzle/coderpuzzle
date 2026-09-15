impl Solution {
    // Every piece of every split is a substring of length at most
    // n - numFriends + 1, and the largest such substring starts where
    // the lexicographically largest suffix starts, truncated to that cap.
    pub fn answer_string(word: String, num_friends: i32) -> String {
        let bytes = word.as_bytes();
        let n = bytes.len();
        if num_friends == 1 {
            return word;
        }
        let limit = n as isize - num_friends as isize + 1;
        // Duel for the start of the largest suffix: i is the champion, j the
        // challenger, k the offset at which they currently tie.
        let (mut i, mut j, mut k) = (0usize, 1usize, 0usize);
        while j + k < n {
            if bytes[i + k] == bytes[j + k] {
                k += 1;
            } else if bytes[i + k] < bytes[j + k] {
                // Challenger wins: suffixes i..i+k all lose to j..j+k.
                i += k + 1;
                if i >= j {
                    j = i + 1;
                }
                k = 0;
            } else {
                // Champion wins: suffixes j..j+k all lose to i..i+k.
                j += k + 1;
                k = 0;
            }
        }
        let end = (i as isize + limit).min(n as isize) as usize;
        word[i..end].to_string()
    }
}
