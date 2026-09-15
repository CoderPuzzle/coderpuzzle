class Solution {

    public int[] onceTwice(int[] nums) {
        // Bits of the thrice-repeated values cancel out of any per-bit count
        // taken modulo 3, so two masks tracking each bit column's count mod 3 —
        // one for bits seen once, one for bits seen twice — hold the two
        // specials' unshared bits after a single sweep.
        int ones = 0,
            twos = 0;
        for (int x : nums) {
            ones = (ones ^ x) & ~twos;
            twos = (twos ^ x) & ~ones;
        }
        // A bit set in both specials is counted 1 + 2 = 3 times and appears
        // in neither mask, so the masks alone cannot finish the job: a bit
        // where the two values differ must split them apart.
        int differ = ones | twos;
        int bit = differ & -differ;
        // Triples never straddle that bit; one side holds the single, the
        // other the pair, each beside whole triples — the same automaton run
        // per side recovers each value in full, shared bits included.
        int onOnes = 0,
            onTwos = 0,
            offOnes = 0,
            offTwos = 0;
        for (int x : nums) {
            if ((x & bit) != 0) {
                onOnes = (onOnes ^ x) & ~onTwos;
                onTwos = (onTwos ^ x) & ~onOnes;
            } else {
                offOnes = (offOnes ^ x) & ~offTwos;
                offTwos = (offTwos ^ x) & ~offOnes;
            }
        }
        // The side owning the differing bit holds the single exactly when
        // the ones mask owns it; the masks are already signed 32-bit values.
        if ((ones & bit) != 0) {
            return new int[] { onOnes, offTwos };
        }
        return new int[] { offOnes, onTwos };
    }
}
