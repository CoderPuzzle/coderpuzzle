use std::collections::HashMap;

impl Solution {
    pub fn longest_awesome(s: String) -> i32 {
        // mask is a 10-bit number: bit d is 1 when digit d has appeared an
        // odd number of times in the prefix s[0:i+1]. first_seen maps a
        // prefix mask to the smallest index that produced it (mask 0 maps
        // to -1, the empty prefix before the string starts). Two prefixes
        // sharing a mask cancel out to all-even digit counts between them
        // (already rearrangeable into a palindrome); two prefixes whose
        // masks differ in exactly one bit cancel to a single odd count
        // (the lone middle character of an odd-length palindrome).
        let mut first_seen: HashMap<i32, i32> = HashMap::new();
        first_seen.insert(0, -1);
        let mut mask: i32 = 0;
        let mut best = 0;
        for (i, byte) in s.bytes().enumerate() {
            let i = i as i32;
            mask ^= 1 << (byte - b'0');
            if let Some(&earlier) = first_seen.get(&mask) {
                best = best.max(i - earlier);
            } else {
                first_seen.insert(mask, i);
            }
            for digit in 0..10 {
                let candidate = mask ^ (1 << digit);
                if let Some(&earlier) = first_seen.get(&candidate) {
                    best = best.max(i - earlier);
                }
            }
        }
        best
    }
}
