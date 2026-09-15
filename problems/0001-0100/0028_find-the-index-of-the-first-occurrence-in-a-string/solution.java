class Solution {

    public int strStr(String haystack, String needle) {
        // The empty needle occurs at every index by convention; the first is 0.
        if (needle.isEmpty()) return 0;
        int m = needle.length();
        // lps[i]: length of the longest proper prefix of needle[0..i] that is
        // also a suffix of it — how much of a partial match survives a mismatch.
        int[] lps = new int[m];
        int k = 0;
        for (int i = 1; i < m; ++i) {
            while (k > 0 && needle.charAt(i) != needle.charAt(k)) k = lps[k - 1];
            if (needle.charAt(i) == needle.charAt(k)) ++k;
            lps[i] = k;
        }
        // Scan haystack once; k counts the needle characters currently matched
        // ending at haystack[i]. On mismatch k falls back to the longest needle
        // prefix that is still a suffix of the matched window, not to zero.
        k = 0;
        for (int i = 0; i < haystack.length(); ++i) {
            char ch = haystack.charAt(i);
            while (k > 0 && ch != needle.charAt(k)) k = lps[k - 1];
            if (ch == needle.charAt(k)) ++k;
            if (k == m) return i - m + 1;
        }
        return -1;
    }
}
