impl Solution {
    // A stone counts when its letter is one of the jewel types. Those
    // types are case sensitive and English letters occupy two disjoint
    // ASCII bands, 65..90 and 97..122, so a direct 128-slot table keyed
    // by character code marks each jewel letter in place — 'a' and 'A'
    // land in different slots with no folding — and every stone then
    // costs one array lookup.
    pub fn num_jewels_in_stones(jewels: String, stones: String) -> i32 {
        let mut is_jewel = [false; 128];
        for &b in jewels.as_bytes() {
            is_jewel[b as usize] = true;
        }
        let mut count = 0;
        for &b in stones.as_bytes() {
            if is_jewel[b as usize] {
                count += 1;
            }
        }
        count
    }
}
