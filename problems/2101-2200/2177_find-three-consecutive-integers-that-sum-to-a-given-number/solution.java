class Solution {

    public long[] sumOfThree(long num) {
        // Three consecutive integers x-1, x, x+1 sum to exactly 3x, so a
        // triple exists iff num is a multiple of 3. num reaches 10^15,
        // which only fits in long.
        if (num % 3 != 0) {
            return new long[0];
        }
        long mid = num / 3;
        return new long[] { mid - 1, mid, mid + 1 };
    }
}
