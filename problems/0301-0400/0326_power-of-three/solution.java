class Solution {

    public boolean isPowerOfThree(int n) {
        // 3¹⁹ = 1162261467 is the largest power of three that fits a signed
        // 32-bit integer — 3²⁰ = 3486784401 is past the cap — and 3 is prime,
        // so the only positive divisors of 3¹⁹ are the powers 3⁰ through 3¹⁹.
        // A positive n is a power of three exactly when it divides the ceiling
        // power: one modulo, no loop, no recursion. The n > 0 guard rejects
        // zero and the negatives, which arrive signed down to -2³¹, and its
        // short-circuit keeps the modulo's divisor from ever being 0.
        return n > 0 && 1162261467 % n == 0;
    }
}
