class Solution {

    public long getSum(int[] a) {
        int n = a.length,
            l = 0,
            r = -1;
        int[] d1 = new int[n],
            d2 = new int[n];
        for (int i = 0; i < n; i++) {
            int k = i > r ? 1 : Math.min(d1[l + r - i], r - i + 1);
            while (i - k >= 0 && i + k < n && a[i - k] == a[i + k]) k++;
            d1[i] = k;
            if (i + k - 1 > r) {
                l = i - k + 1;
                r = i + k - 1;
            }
        }
        l = 0;
        r = -1;
        for (int i = 0; i < n; i++) {
            int k = i > r ? 0 : Math.min(d2[l + r - i + 1], r - i + 1);
            while (i - k - 1 >= 0 && i + k < n && a[i - k - 1] == a[i + k]) k++;
            d2[i] = k;
            if (i + k - 1 > r) {
                l = i - k;
                r = i + k - 1;
            }
        }
        long[] p = new long[n + 1];
        for (int i = 0; i < n; i++) p[i + 1] = p[i] + a[i];
        long ans = 0;
        for (int i = 0; i < n; i++) {
            ans = Math.max(ans, p[i + d1[i]] - p[i - d1[i] + 1]);
            ans = Math.max(ans, p[i + d2[i]] - p[i - d2[i]]);
        }
        return ans;
    }
}
