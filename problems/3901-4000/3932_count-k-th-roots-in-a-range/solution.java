class Solution {

    public int countKthRoots(int l, int r, int k) {
        if (k == 1) return r - l + 1;
        return count(r, k) - count((long) l - 1, k);
    }

    private int count(long bound, int k) {
        if (bound < 0) return 0;
        long low = 0,
            high = bound;
        while (low < high) {
            long middle = low + (high - low + 1) / 2;
            if (fits(middle, k, bound)) low = middle;
            else high = middle - 1;
        }
        return (int) low + 1;
    }

    private boolean fits(long base, int k, long bound) {
        long value = 1;
        for (int i = 0; i < k; i++) {
            if (base != 0 && value > bound / base) return false;
            value *= base;
        }
        return value <= bound;
    }
}
