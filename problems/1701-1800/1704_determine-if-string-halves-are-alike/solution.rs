impl Solution {
    // Only the vowel totals of the two halves matter — which vowel it is,
    // where it sits, and whether it is upper- or lowercase are all
    // irrelevant. One pass with a single counter: +1 for every vowel in the
    // first half, -1 for every vowel in the second; equal totals land the
    // counter back at exactly zero.
    pub fn halves_are_alike(s: String) -> bool {
        let half = s.len() / 2;
        let mut balance = 0i32;
        for (i, byte) in s.bytes().enumerate() {
            if matches!(
                byte,
                b'a' | b'e' | b'i' | b'o' | b'u' | b'A' | b'E' | b'I' | b'O' | b'U'
            ) {
                balance += if i < half { 1 } else { -1 };
            }
        }
        balance == 0
    }
}
