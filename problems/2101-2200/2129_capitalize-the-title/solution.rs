impl Solution {
    pub fn capitalize_title(title: String) -> String {
        title
            .split(' ')
            .map(|word| {
                let mut letters = word.as_bytes().to_vec();
                letters.make_ascii_lowercase();
                if letters.len() > 2 {
                    letters[0] = letters[0].to_ascii_uppercase();
                }
                String::from_utf8(letters).unwrap()
            })
            .collect::<Vec<_>>()
            .join(" ")
    }
}
