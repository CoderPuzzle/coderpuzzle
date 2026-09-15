class Solution {

    public long maximumValue(int n, int s, int m) {
        if (n == 1) return s;
        long highCount = n / 2L;
        long increaseFirst = s + (long) m + (highCount - 1) * (m - 1L);
        long decreaseFirst = s + (long) m - 1 + (highCount - 1) * (m - 1L);
        return Math.max(increaseFirst, decreaseFirst);
    }
}
