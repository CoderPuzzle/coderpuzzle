class Solution {

    public long maxProduct(String s) {
        int n = s.length();

        // Manacher (odd palindromes): d1[i] = number of odd palindromes centered at i
        int[] d1 = new int[n];
        int left = 0,
            right = -1;
        for (int i = 0; i < n; i++) {
            int k;
            if (i > right) {
                k = 1;
            } else {
                k = Math.min(d1[left + right - i], right - i + 1);
            }
            while (i - k >= 0 && i + k < n && s.charAt(i - k) == s.charAt(i + k)) {
                k++;
            }
            d1[i] = k;
            if (i + k - 1 > right) {
                left = i - k + 1;
                right = i + k - 1;
            }
        }

        // Record, per center, the longest odd palindrome that ends exactly
        // at each index and the longest that starts exactly at each index.
        int[] bestEnd = new int[n];
        int[] bestStart = new int[n];
        for (int c = 0; c < n; c++) {
            int length = 2 * d1[c] - 1;
            int end = c + d1[c] - 1;
            int start = c - d1[c] + 1;
            if (length > bestEnd[end]) bestEnd[end] = length;
            if (length > bestStart[start]) bestStart[start] = length;
        }

        // Shrink from the recorded maximum: a palindrome ending at i+1 of length L
        // implies one ending at i of length L-2 (drop one char from each side).
        for (int i = n - 2; i >= 0; i--) {
            int candEnd = bestEnd[i + 1] - 2;
            if (candEnd > bestEnd[i]) bestEnd[i] = candEnd;
        }
        for (int i = 1; i < n; i++) {
            int candStart = bestStart[i - 1] - 2;
            if (candStart > bestStart[i]) bestStart[i] = candStart;
        }

        // Prefix max of bestEnd / suffix max of bestStart = the longest
        // palindrome fully inside each prefix / suffix.
        long[] pref = new long[n];
        pref[0] = bestEnd[0];
        for (int i = 1; i < n; i++) {
            pref[i] = Math.max(pref[i - 1], bestEnd[i]);
        }

        long[] suff = new long[n];
        suff[n - 1] = bestStart[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            suff[i] = Math.max(suff[i + 1], bestStart[i]);
        }

        // The two palindromes are disjoint, so some split separates them;
        // try every split. Single characters are length-1 palindromes, so
        // both sides always contribute at least 1.
        long ans = 0;
        for (int i = 0; i < n - 1; i++) {
            long candidate = pref[i] * suff[i + 1];
            if (candidate > ans) ans = candidate;
        }
        return ans;
    }
}
