impl Solution {
    pub fn check_strings(s1: String, s2: String) -> bool {
        // Swapping indices whose distance is even keeps every character inside
        // its own index-parity class, and any two positions of one class are
        // directly swappable, so each class is freely rearrangeable. The strings
        // can therefore be made equal exactly when each parity class holds the
        // same multiset of characters in both strings.
        let mut counts = [[0i32; 26]; 2];
        for (index, byte) in s1.bytes().enumerate() {
            counts[index % 2][(byte - b'a') as usize] += 1;
        }
        for (index, byte) in s2.bytes().enumerate() {
            let slot = &mut counts[index % 2][(byte - b'a') as usize];
            *slot -= 1;
            if *slot < 0 {
                // s2's parity class needs a copy this character s1 cannot supply.
                return false;
            }
        }
        true
    }
}
