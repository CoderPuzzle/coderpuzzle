impl Solution {
    // Every character occurs exactly once in each string, so its share
    // of the sum is fixed by the two positions alone: one pass records
    // where each letter sits in s, and one pass over t reduces every
    // term to a lookup plus an absolute difference.
    pub fn find_permutation_difference(s: String, t: String) -> i32 {
        let mut pos = [0i32; 26];
        for (i, byte) in s.bytes().enumerate() {
            pos[(byte - b'a') as usize] = i as i32;
        }
        let mut total = 0;
        for (i, byte) in t.bytes().enumerate() {
            total += (i as i32 - pos[(byte - b'a') as usize]).abs();
        }
        total
    }
}
