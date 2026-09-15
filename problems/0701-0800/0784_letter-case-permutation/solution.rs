impl Solution {
    pub fn letter_case_permutation(s: String) -> Vec<String> {
        // Interleaved list-doubling: scan s left to right; at each letter
        // every string built so far is immediately followed by its copy
        // with that one letter's case flipped.
        let mut result: Vec<String> = vec![s.clone()];
        for (i, &ch) in s.as_bytes().iter().enumerate() {
            if !ch.is_ascii_alphabetic() {
                continue;
            }
            let mut grown: Vec<String> = Vec::with_capacity(result.len() * 2);
            for current in &result {
                grown.push(current.clone());
                // Step i only rewrites position i, so every string still
                // carries s's own byte there — a plain ASCII case toggle.
                let mut toggled = current.clone().into_bytes();
                toggled[i] ^= 0x20;
                grown.push(String::from_utf8(toggled).unwrap());
            }
            result = grown;
        }
        result
    }
}
