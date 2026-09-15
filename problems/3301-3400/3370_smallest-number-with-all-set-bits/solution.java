class Solution {

    public int smallestNumber(int n) {
        // Every number whose bits are all set has the form 2^t - 1. The
        // smallest such value that is >= n uses exactly as many bits as n
        // has: 32 - numberOfLeadingZeros(n) is n's bit length, so the
        // answer is the strictly greater power of two minus one (hint 1).
        // With n <= 1000 the result is at most 1023 and fits an int.
        return (1 << (32 - Integer.numberOfLeadingZeros(n))) - 1;
    }
}
