class Solution {

    public long specialPalindrome(long n) {
        // A palindrome carries at most one digit an odd number of times, so
        // a digit set works only with at most one odd member; any set whose
        // digits sum past 16 makes palindromes of 17+ digits, beyond every
        // answer reachable from n <= 10^15.
        final long limit = 4000000000000000L;
        long answer = limit;
        for (int mask = 1; mask < 512; mask++) {
            int[] digits = new int[9];
            int count = 0,
                odds = 0,
                total = 0;
            for (int d = 1; d <= 9; d++) {
                if (((mask >> (d - 1)) & 1) == 1) {
                    digits[count++] = d;
                    odds += d & 1;
                    total += d;
                }
            }
            if (odds > 1 || total > 16) {
                continue;
            }
            // Each member k lays k / 2 copies into each half (built ascending,
            // since digits are); a lone odd member also takes the middle.
            int mid = 0;
            int[] half = new int[8];
            int len = 0;
            for (int i = 0; i < count; i++) {
                int d = digits[i];
                if ((d & 1) == 1) {
                    mid = d;
                }
                for (int c = d / 2; c > 0; c--) {
                    half[len++] = d;
                }
            }
            // Mirroring preserves order, so lexicographic halves enumerate
            // this set's palindromes in increasing numeric order.
            while (true) {
                long pal = 0;
                for (int i = 0; i < len; i++) {
                    pal = pal * 10 + half[i];
                }
                if (mid > 0) {
                    pal = pal * 10 + mid;
                }
                for (int i = len - 1; i >= 0; i--) {
                    pal = pal * 10 + half[i];
                }
                if (pal > limit) {
                    break; // later halves only mirror to larger numbers
                }
                if (pal > n) {
                    answer = Math.min(answer, pal);
                    break; // first past n is this set's best
                }
                if (!nextPermutation(half, len)) {
                    break;
                }
            }
        }
        return answer;
    }

    private boolean nextPermutation(int[] a, int len) {
        // Advance a multiset to its next distinct permutation in place;
        // false once it has reached the last (descending) arrangement.
        int i = len - 2;
        while (i >= 0 && a[i] >= a[i + 1]) {
            i--;
        }
        if (i < 0) {
            return false;
        }
        int j = len - 1;
        while (a[j] <= a[i]) {
            j--;
        }
        int t = a[i];
        a[i] = a[j];
        a[j] = t;
        for (int lo = i + 1, hi = len - 1; lo < hi; lo++, hi--) {
            t = a[lo];
            a[lo] = a[hi];
            a[hi] = t;
        }
        return true;
    }
}
