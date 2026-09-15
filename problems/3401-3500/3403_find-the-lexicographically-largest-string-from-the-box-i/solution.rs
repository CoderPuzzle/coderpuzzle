impl Solution {
    pub fn answer_string(word: String, num_friends: i32) -> String {
        // One piece can hold at most n - numFriends + 1 letters (the other
        // numFriends - 1 pieces need one each), and for numFriends > 1 every
        // such capped slice really is a piece of some split, so the box's
        // maximum is the largest capped slice over all start positions.
        if num_friends == 1 {
            return word;
        }
        let n = word.len();
        let limit = n - num_friends as usize + 1;
        let mut best: &str = "";
        for i in 0..n {
            let end = (i + limit).min(n);
            if &word[i..end] > best {
                best = &word[i..end];
            }
        }
        best.to_string()
    }
}
