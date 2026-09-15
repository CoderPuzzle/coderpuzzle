class Solution {

    public boolean[] canMakePaliQueries(String s, int[][] queries) {
        int n = s.length();
        // prefix[i] = bitmask of parities of letter counts in s[:i]
        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] ^ (1 << (s.charAt(i) - 'a'));
        }
        boolean[] answer = new boolean[queries.length];
        for (int q = 0; q < queries.length; q++) {
            int left = queries[q][0];
            int right = queries[q][1];
            int k = queries[q][2];
            int mask = prefix[right + 1] ^ prefix[left];
            int odd = Integer.bitCount(mask);
            answer[q] = odd / 2 <= k;
        }
        return answer;
    }
}
