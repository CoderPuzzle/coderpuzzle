class Solution {

    public int minStartingIndex(String s, String pattern) {
        // A window s[i..i+m-1] is almost equal to pattern iff its mismatches
        // fit in one slot: with f = forward match length at i (prefix of
        // pattern) and b = backward match length from the window's right end
        // (suffix of pattern), the window matches exactly when f == m, and
        // when f + b >= m - 1 the runs leave at most one character between
        // them, which a single change absorbs. Both tables come from
        // Z-functions: forward over pattern + sep + s; over the reversals, a
        // prefix of the reversed pattern matching at offset n - 1 - (window
        // end) is exactly a common suffix ending at that window end.
        int n = s.length(),
            m = pattern.length();
        int[] values = new int[m + 1 + n];
        for (int i = 0; i < m; i++) {
            values[i] = pattern.charAt(i);
        }
        values[m] = -1;
        for (int i = 0; i < n; i++) {
            values[m + 1 + i] = s.charAt(i);
        }
        int[] z = zFunction(values);
        int[] rvalues = new int[m + 1 + n];
        for (int i = 0; i < m; i++) {
            rvalues[i] = pattern.charAt(m - 1 - i);
        }
        rvalues[m] = -1;
        for (int i = 0; i < n; i++) {
            rvalues[m + 1 + i] = s.charAt(n - 1 - i);
        }
        int[] r = zFunction(rvalues);
        for (int i = 0; i + m <= n; ++i) {
            int f = Math.min(z[m + 1 + i], m);
            if (f >= m || f + Math.min(r[m + 1 + n - i - m], m) >= m - 1) return i;
        }
        return -1;
    }

    private static int[] zFunction(int[] values) {
        int m = values.length;
        int[] z = new int[m];
        z[0] = m;
        int left = 0,
            right = 0;
        for (int i = 1; i < m; i++) {
            if (i < right) {
                z[i] = Math.min(right - i, z[i - left]);
            }
            while (i + z[i] < m && values[z[i]] == values[i + z[i]]) {
                z[i]++;
            }
            if (i + z[i] > right) {
                left = i;
                right = i + z[i];
            }
        }
        return z;
    }
}
