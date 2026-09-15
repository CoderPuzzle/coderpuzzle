impl Solution {
    pub fn vowel_strings(words: Vec<String>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // Prefix sums over the vowel-string marks: prefix[i+1] counts
        // the strings among words[0..i] that start and end with a vowel,
        // so a query [l, r] costs one subtraction. Counts stay below
        // words length <= 10^5, well inside i32.
        let is_vowel = |c: u8| matches!(c, b'a' | b'e' | b'i' | b'o' | b'u');
        let mut prefix = vec![0i32; words.len() + 1];
        for (i, w) in words.iter().enumerate() {
            let bytes = w.as_bytes();
            prefix[i + 1] = prefix[i] + ((is_vowel(bytes[0]) && is_vowel(bytes[bytes.len() - 1])) as i32);
        }
        queries
            .iter()
            .map(|q| prefix[(q[1] + 1) as usize] - prefix[q[0] as usize])
            .collect()
    }
}
