impl Solution {
    pub fn min_changes(s: String) -> i32 {
        // Every beautiful partition refines into length-2 uniform blocks:
        // split each even uniform part down to pairs. So the answer is the
        // number of aligned pairs that are not already uniform, and each
        // such pair costs exactly one change (align both to one value).
        let bytes = s.as_bytes();
        let mut changes = 0i32;
        let mut i = 0;
        while i + 1 < bytes.len() {
            if bytes[i] != bytes[i + 1] {
                changes += 1;
            }
            i += 2;
        }
        changes
    }
}
