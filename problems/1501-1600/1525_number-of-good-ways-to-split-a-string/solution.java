class Solution {

    public int numSplits(String s) {
        int n = s.length();

        // prefix[i]: number of distinct letters in s[0..i]
        int[] prefix = new int[n];
        boolean[] seen = new boolean[26];
        int distinct = 0;
        for (int i = 0; i < n; i++) {
            int idx = s.charAt(i) - 'a';
            if (!seen[idx]) {
                seen[idx] = true;
                distinct++;
            }
            prefix[i] = distinct;
        }

        // suffix[i]: number of distinct letters in s[i..n-1]
        int[] suffix = new int[n];
        seen = new boolean[26];
        distinct = 0;
        for (int i = n - 1; i >= 0; i--) {
            int idx = s.charAt(i) - 'a';
            if (!seen[idx]) {
                seen[idx] = true;
                distinct++;
            }
            suffix[i] = distinct;
        }

        int count = 0;
        for (int i = 0; i < n - 1; i++) {
            if (prefix[i] == suffix[i + 1]) {
                count++;
            }
        }
        return count;
    }
}
