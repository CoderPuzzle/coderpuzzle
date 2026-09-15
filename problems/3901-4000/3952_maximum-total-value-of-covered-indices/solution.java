class Solution {

    public long maxTotal(int[] a, String s) {
        long ans = 0;
        int i = 0;
        while (i < a.length) {
            if (s.charAt(i) == '0') {
                i++;
                continue;
            }
            int l = i,
                m = Integer.MAX_VALUE;
            long z = 0;
            while (i < a.length && s.charAt(i) == '1') {
                z += a[i];
                m = Math.min(m, a[i++]);
            }
            ans += l == 0 ? z : z + a[l - 1] - Math.min(m, a[l - 1]);
        }
        return ans;
    }
}
