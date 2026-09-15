impl Solution {
    pub fn reverse_by_type(s: String) -> String {
        // The two reversals act on disjoint position sets — a slot that
        // starts on a letter ends on a letter — so each class can be
        // reversed independently, in place. Each pass walks two pointers
        // inward from the ends, skipping characters outside the class
        // being reversed, and swaps when both sides are on the class.
        let mut chars = s.into_bytes();
        let n = chars.len();

        let is_letter = |c: u8| c.is_ascii_lowercase();

        let mut i = 0;
        let mut j = n - 1;
        while i < j {
            if !is_letter(chars[i]) {
                i += 1;
            } else if !is_letter(chars[j]) {
                j -= 1;
            } else {
                chars.swap(i, j);
                i += 1;
                j -= 1;
            }
        }

        i = 0;
        j = n - 1;
        while i < j {
            if is_letter(chars[i]) {
                i += 1;
            } else if is_letter(chars[j]) {
                j -= 1;
            } else {
                chars.swap(i, j);
                i += 1;
                j -= 1;
            }
        }
        String::from_utf8(chars).unwrap()
    }
}
