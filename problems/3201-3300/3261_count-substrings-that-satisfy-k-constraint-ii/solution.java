class Solution {

    public long[] countKConstraintSubstrings(String s, int k, int[][] queries) {
        int n = s.length();
        int[] bounds = new int[n];
        int left = 0;
        int zeros = 0;
        int ones = 0;
        for (int right = 0; right < n; right++) {
            if (s.charAt(right) == '0') {
                zeros++;
            } else {
                ones++;
            }
            while (zeros > k && ones > k) {
                if (s.charAt(left) == '0') {
                    zeros--;
                } else {
                    ones--;
                }
                left++;
            }
            bounds[right] = left;
        }
        long[] pre = new long[n + 1];
        for (int j = 0; j < n; j++) {
            pre[j + 1] = pre[j] + (j + 1 - bounds[j]);
        }
        int[] next = new int[n];
        int ptr = n;
        for (int l = n - 1; l >= 0; l--) {
            while (ptr > 0 && bounds[ptr - 1] >= l) {
                ptr--;
            }
            next[l] = ptr;
        }
        long[] answer = new long[queries.length];
        for (int t = 0; t < queries.length; t++) {
            int l = queries[t][0];
            int r = queries[t][1];
            int j = next[l];
            if (j > r) {
                long m = r - l + 1;
                answer[t] = (m * (m + 1)) / 2;
            } else {
                long d = j - l;
                answer[t] = pre[r + 1] - pre[j] + (d * (d + 1)) / 2;
            }
        }
        return answer;
    }
}
