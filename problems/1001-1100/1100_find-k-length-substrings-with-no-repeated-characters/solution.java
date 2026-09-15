class Solution {

    public int numKLenSubstrNoRepeats(String s, int k) {
        // A window of length k is valid exactly when all k positions hold
        // different characters, i.e. distinct == k. Slide in place.
        int n = s.length();
        if (k > n || k > 26) return 0;
        int[] freq = new int[26];
        int distinct = 0;
        int ans = 0;
        for (int i = 0; i < n; ++i) {
            int right = s.charAt(i) - 'a';
            if (++freq[right] == 1) ++distinct;
            if (i >= k) {
                int left = s.charAt(i - k) - 'a';
                if (--freq[left] == 0) --distinct;
            }
            if (distinct == k) ++ans;
        }
        return ans;
    }
}
