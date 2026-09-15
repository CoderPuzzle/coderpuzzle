class Solution {

    public int nextBeautifulNumber(int n) {
        for (int candidate = n + 1; ; ++candidate) {
            if (isBalanced(candidate)) return candidate;
        }
    }

    private boolean isBalanced(int value) {
        int[] counts = new int[10];
        while (value > 0) {
            int digit = value % 10;
            if (digit == 0) return false;
            counts[digit]++;
            value /= 10;
        }
        for (int digit = 1; digit < 10; ++digit) {
            if (counts[digit] != 0 && counts[digit] != digit) return false;
        }
        return true;
    }
}
