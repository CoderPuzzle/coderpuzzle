class Solution {

    public boolean canMakeSubsequence(String s, String t) {
        int m = s.length();
        int n = t.length();
        int[] pref = new int[m + 1];
        java.util.Arrays.fill(pref, n + 1);
        pref[0] = 0;
        for (int i = 0; i < m; i++) {
            int j = pref[i];
            while (j < n && s.charAt(i) != t.charAt(j)) {
                j++;
            }
            pref[i + 1] = j < n ? j + 1 : n + 1;
        }
        if (pref[m] <= n) {
            return true;
        }

        int[] suf = new int[m + 1];
        java.util.Arrays.fill(suf, -1);
        suf[m] = n;
        for (int i = m - 1; i >= 0; i--) {
            int j = suf[i + 1] - 1;
            while (j >= 0 && s.charAt(i) != t.charAt(j)) {
                j--;
            }
            suf[i] = j;
        }

        for (int i = 0; i < m; i++) {
            if (pref[i] < suf[i + 1]) {
                return true;
            }
        }
        return false;
    }
}
