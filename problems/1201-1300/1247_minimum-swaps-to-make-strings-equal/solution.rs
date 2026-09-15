impl Solution {
    pub fn minimum_swap(s1: String, s2: String) -> i32 {
        // Each swap fixes two mismatches, so an odd total is impossible.
        let mut xy = 0;
        let mut yx = 0;
        for (a, b) in s1.bytes().zip(s2.bytes()) {
            match (a, b) {
                (b'x', b'y') => xy += 1,
                (b'y', b'x') => yx += 1,
                _ => {}
            }
        }
        if (xy + yx) % 2 == 1 {
            return -1;
        }
        // Same-shape pairs cost 1 each; one leftover pair of each shape costs 2.
        xy / 2 + yx / 2 + if xy % 2 == 1 { 2 } else { 0 }
    }
}
