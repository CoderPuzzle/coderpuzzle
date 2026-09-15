impl Solution {
    pub fn once_twice(nums: Vec<i32>) -> Vec<i32> {
        // Bits of the thrice-repeated values cancel out of any per-bit count
        // taken modulo 3, so two masks tracking each bit column's count mod 3 —
        // one for bits seen once, one for bits seen twice — hold the two
        // specials' unshared bits after a single sweep.
        let mut ones = 0i32;
        let mut twos = 0i32;
        for &x in &nums {
            ones = (ones ^ x) & !twos;
            twos = (twos ^ x) & !ones;
        }
        // A bit set in both specials is counted 1 + 2 = 3 times and appears
        // in neither mask, so the masks alone cannot finish the job: a bit
        // where the two values differ must split them apart.
        let differ = ones | twos;
        let bit = differ & differ.wrapping_neg();
        // Triples never straddle that bit; one side holds the single, the
        // other the pair, each beside whole triples — the same automaton run
        // per side recovers each value in full, shared bits included.
        let mut on_ones = 0i32;
        let mut on_twos = 0i32;
        let mut off_ones = 0i32;
        let mut off_twos = 0i32;
        for &x in &nums {
            if (x & bit) != 0 {
                on_ones = (on_ones ^ x) & !on_twos;
                on_twos = (on_twos ^ x) & !on_ones;
            } else {
                off_ones = (off_ones ^ x) & !off_twos;
                off_twos = (off_twos ^ x) & !off_ones;
            }
        }
        // The side owning the differing bit holds the single exactly when
        // the ones mask owns it; the masks are already signed 32-bit values.
        if (ones & bit) != 0 {
            vec![on_ones, off_twos]
        } else {
            vec![off_ones, on_twos]
        }
    }
}
