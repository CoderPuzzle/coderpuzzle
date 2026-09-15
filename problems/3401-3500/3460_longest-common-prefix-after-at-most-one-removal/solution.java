class Solution {

    public int longestCommonPrefix(String s, String t) {
        int n = s.length();
        int m = t.length();
        // Walk to the first mismatch (or whichever string ends first).
        int i = 0;
        while (i < n && i < m && s.charAt(i) == t.charAt(i)) {
            i++;
        }
        // Removing s[i] is the only deletion worth trying: an earlier one
        // shifts the alignment for no gain, a later one cannot repair the
        // mismatch at i.
        int j = i + 1;
        int k = i;
        while (j < n && k < m && s.charAt(j) == t.charAt(k)) {
            j++;
            k++;
        }
        return k;
    }
}
