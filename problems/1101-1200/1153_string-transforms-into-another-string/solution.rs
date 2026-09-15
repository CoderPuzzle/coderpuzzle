impl Solution {
    pub fn can_convert(str1: String, str2: String) -> bool {
        if str1 == str2 {
            // Zero conversions needed; cycles in the mapping never fire.
            return true;
        }
        let mut mapping = [None; 26];
        let mut target = [false; 26];
        let bytes1 = str1.as_bytes();
        let bytes2 = str2.as_bytes();
        for i in 0..bytes1.len() {
            let a = (bytes1[i] - b'a') as usize;
            let b = (bytes2[i] - b'a') as usize;
            if let Some(prior) = mapping[a] {
                if prior != b {
                    // One source letter would need two different targets.
                    return false;
                }
            }
            mapping[a] = Some(b);
            target[b] = true;
        }
        // A cycle needs a spare letter to break it, and a spare is any
        // letter that never appears as a target.
        target.iter().filter(|&&t| t).count() < 26
    }
}
