class Solution {

    public int[] getNoZeroIntegers(int n) {
        // Smallest-a decomposition: arithmetic digit test, no strings.
        for (int a = 1; a < n; ++a) {
            if (noZero(a) && noZero(n - a)) {
                return new int[] { a, n - a };
            }
        }
        return new int[] {};
    }

    private boolean noZero(int x) {
        while (x > 0) {
            if (x % 10 == 0) {
                return false;
            }
            x /= 10;
        }
        return true;
    }
}
