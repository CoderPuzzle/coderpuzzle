impl Solution {
    pub fn shortest_completing_word(license_plate: String, words: Vec<String>) -> String {
        // The plate's demand: how many of each letter a word must supply.
        // ASCII puts every uppercase letter in 65..90 and its lowercase
        // twin 32 codes higher, so one range check + 32 folds the case;
        // digits and spaces match neither range and demand nothing.
        let mut plate = [0i32; 26];
        for &byte in license_plate.as_bytes() {
            let mut b = byte;
            if b >= b'A' && b <= b'Z' {
                b += 32;
            }
            if b >= b'a' && b <= b'z' {
                plate[(b - b'a') as usize] += 1;
            }
        }
        let mut best: Option<&str> = None;
        for word in &words {
            // First-wins: only a strictly shorter word can displace the
            // best seen so far, so equal or longer words are skipped
            // without even counting their letters.
            if let Some(current) = best {
                if word.len() >= current.len() {
                    continue;
                }
            }
            let mut counts = [0i32; 26];
            for &byte in word.as_bytes() {
                counts[(byte - b'a') as usize] += 1;
            }
            // Covering: the word holds at least the plate's multiplicity
            // of every letter. Extra letters are free.
            if counts.iter().zip(plate.iter()).all(|(w, p)| w >= p) {
                best = Some(word);
            }
        }
        // The statement guarantees a completing word exists, so best is
        // never None on valid input.
        best.unwrap_or("").to_string()
    }
}
