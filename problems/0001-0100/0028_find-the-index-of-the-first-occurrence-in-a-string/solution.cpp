class Solution {
  public:
    int strStr(string haystack, string needle) {
        // The empty needle occurs at every index by convention; the first is 0.
        if (needle.empty())
            return 0;
        int m = needle.size();
        // lps[i]: length of the longest proper prefix of needle[0..i] that is
        // also a suffix of it — how much of a partial match survives a mismatch.
        vector<int> lps(m, 0);
        int k = 0;
        for (int i = 1; i < m; ++i) {
            while (k > 0 && needle[i] != needle[k])
                k = lps[k - 1];
            if (needle[i] == needle[k])
                ++k;
            lps[i] = k;
        }
        // Scan haystack once; k counts the needle characters currently matched
        // ending at haystack[i]. On mismatch k falls back to the longest needle
        // prefix that is still a suffix of the matched window, not to zero.
        k = 0;
        for (int i = 0; i < (int)haystack.size(); ++i) {
            while (k > 0 && haystack[i] != needle[k])
                k = lps[k - 1];
            if (haystack[i] == needle[k])
                ++k;
            if (k == m)
                return i - m + 1;
        }
        return -1;
    }
};
