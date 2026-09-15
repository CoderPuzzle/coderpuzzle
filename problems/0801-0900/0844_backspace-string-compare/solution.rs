impl Solution {
    // Typing is a story told right-to-left: each '#' deletes the nearest
    // character to its left that survives, and backspacing an empty text
    // leaves it empty. Walk both strings from the end, skip everything that
    // gets deleted, and compare the survivors pairwise.
    pub fn backspace_compare(s: String, t: String) -> bool {
        let (s, t) = (s.as_bytes(), t.as_bytes());
        let (mut i, mut j) = (s.len() as isize - 1, t.len() as isize - 1);
        loop {
            i = Self::settle(s, i);
            j = Self::settle(t, j);
            if i < 0 || j < 0 {
                // One text ran out: equal only if both did, so both-empty
                // counts as equal and a lone survivor decides false.
                return i == j;
            }
            if s[i as usize] != t[j as usize] {
                return false;
            }
            i -= 1;
            j -= 1;
        }
    }

    // Move index left past deleted characters; return the nearest survivor's
    // index, or -1 when nothing survives.
    fn settle(bytes: &[u8], mut index: isize) -> isize {
        let mut skip = 0;
        while index >= 0 {
            if bytes[index as usize] == b'#' {
                skip += 1;
            } else if skip > 0 {
                skip -= 1;
            } else {
                return index;
            }
            index -= 1;
        }
        -1
    }
}
