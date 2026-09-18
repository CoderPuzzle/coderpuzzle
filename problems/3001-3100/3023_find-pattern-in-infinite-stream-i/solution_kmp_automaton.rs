impl Solution {
    pub fn findPattern(stream: &mut InfiniteStream, pattern: Vec<i32>) -> i32 {
        let length = pattern.len();
        // KMP failure function, built from the pattern alone: fail[k] is the
        // length of the longest proper prefix of the pattern that is also a
        // suffix of its first k bits.
        let mut fail = vec![0usize; length + 1];
        let mut matched = 0usize;
        for i in 1..length {
            while matched > 0 && pattern[i] != pattern[matched] {
                matched = fail[matched];
            }
            if pattern[i] == pattern[matched] {
                matched += 1;
            }
            fail[i + 1] = matched;
        }
        // Stream the bits through the automaton: the state counts the pattern
        // bits matched so far. Each arriving bit either extends the state or
        // falls it back along the failure links, so no bit is ever needed
        // twice -- the state reaching `length` means the match just ended at
        // `read`, and its start is read - length.
        let mut state = 0usize;
        let mut read: i64 = 0;
        loop {
            let bit = stream.next();
            read += 1;
            while state > 0 && pattern[state] != bit {
                state = fail[state];
            }
            if pattern[state] == bit {
                state += 1;
            }
            if state == length {
                return (read - length as i64) as i32;
            }
        }
    }
}
