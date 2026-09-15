impl Solution {
    pub fn sort_vowels(s: String) -> String {
        let vowels = b"aeiou";
        let mut counts = [0usize; 5];
        let mut first = [s.len(); 5];
        for (position, byte) in s.bytes().enumerate() {
            if let Some(slot) = vowels.iter().position(|&vowel| vowel == byte) {
                counts[slot] += 1;
                first[slot] = first[slot].min(position);
            }
        }

        let mut order = [0usize, 1, 2, 3, 4];
        order.sort_by(|&a, &b| counts[b].cmp(&counts[a]).then(first[a].cmp(&first[b])));
        let mut arranged = Vec::new();
        for slot in order {
            arranged.extend(std::iter::repeat(vowels[slot]).take(counts[slot]));
        }

        let mut answer = s.into_bytes();
        let mut pointer = 0;
        for byte in &mut answer {
            if vowels.contains(byte) {
                *byte = arranged[pointer];
                pointer += 1;
            }
        }
        String::from_utf8(answer).unwrap()
    }
}
