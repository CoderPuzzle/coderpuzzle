impl Solution {
    pub fn is_valid_serialization(preorder: String) -> bool {
        // slots counts tree positions still waiting to be filled — one for the
        // root at the start. Each token fills one slot; a number then opens two
        // more for its children, a '#' opens none. The serialization is valid
        // exactly when no token arrives after the slots run out and the last
        // token closes the last one, so no tree is ever built.
        let bytes = preorder.as_bytes();
        let n = bytes.len();
        let mut slots = 1;
        let mut i = 0;
        while i < n {
            // A token with no open slot has nowhere to live: the tree this
            // string describes was already finished earlier.
            if slots == 0 {
                return false;
            }
            slots -= 1;
            // Only the first character of a token matters: a valid token is
            // either a number or the one-character '#'.
            let is_null = bytes[i] == b'#';
            while i < n && bytes[i] != b',' {
                i += 1;
            }
            // Step past the comma (harmless past the last token).
            i += 1;
            if !is_null {
                slots += 2;
            }
        }
        slots == 0
    }
}
