class Solution {

    public int trailingZeroes(int n) {
        // Twos outnumber fives in n!, so each trailing zero costs exactly one
        // factor 5: the answer is Legendre's sum n/5 + n/25 + n/125 + ...
        // The power accumulator is a long because the first power of 5 past a
        // large n is 5^14, beyond the 32-bit range; a wrapped-negative power
        // would re-enter the loop forever.
        int count = 0;
        for (long power = 5; power <= n; power *= 5) {
            count += n / power;
        }
        return count;
    }
}
