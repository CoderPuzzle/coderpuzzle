impl Solution {
    pub fn compressed_string(word: String) -> String {
        // One sweep over the runs of equal characters, slicing each run
        // into chunks of at most nine because that is all one operation may
        // remove -- a length-14 run therefore encodes as "9c5c".
        let bytes = word.as_bytes();
        let n = bytes.len();
        let mut comp = Vec::with_capacity(2 * n);
        let mut i = 0;
        while i < n {
            let c = bytes[i];
            let mut j = i;
            while j < n && bytes[j] == c && j - i < 9 {
                j += 1;
            }
            // Chunks are single digits (1..=9), so the length renders as
            // one ASCII byte.
            comp.push(b'0' + (j - i) as u8);
            comp.push(c);
            i = j;
        }
        String::from_utf8(comp).unwrap()
    }
}
