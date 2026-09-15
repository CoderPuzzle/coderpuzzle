impl Solution {
    pub fn minimize_string_value(s: String) -> String {
        // A letter appearing x times costs x*(x-1)/2 no matter where it
        // sits, so only the final counts matter: each '?' should take the
        // currently least frequent letter (smallest letter on ties — that
        // also makes the fill lexicographically smallest). The chosen
        // letters are then sorted into the '?' slots left to right. Scanning
        // all 26 counts per '?' is O(26n), well within n = 1e5.
        let bytes = s.as_bytes();
        let mut counts = [0_u32; 26];
        for &byte in bytes {
            if byte != b'?' {
                counts[(byte - b'a') as usize] += 1;
            }
        }
        let mut picks: Vec<u8> = Vec::new();
        for &byte in bytes {
            if byte == b'?' {
                let mut best = 0;
                for letter in 1..26 {
                    if counts[letter] < counts[best] {
                        best = letter;
                    }
                }
                counts[best] += 1;
                picks.push(best as u8);
            }
        }
        picks.sort_unstable();
        let mut characters = bytes.to_vec();
        let mut at = 0;
        for i in 0..characters.len() {
            if characters[i] == b'?' {
                characters[i] = b'a' + picks[at];
                at += 1;
            }
        }
        String::from_utf8(characters).unwrap()
    }
}
