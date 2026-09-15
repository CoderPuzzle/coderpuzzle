class Solution {
  public:
    int numKLenSubstrNoRepeats(string s, int k) {
        // A window of length k is valid exactly when all k positions hold
        // different characters, i.e. distinct == k. Slide in place.
        int n = (int)s.size();
        if (k > n || k > 26)
            return 0;
        vector<int> freq(26, 0);
        int distinct = 0, ans = 0;
        for (int i = 0; i < n; ++i) {
            int right = s[i] - 'a';
            if (++freq[right] == 1)
                ++distinct;
            if (i >= k) {
                int left = s[i - k] - 'a';
                if (--freq[left] == 0)
                    --distinct;
            }
            if (distinct == k)
                ++ans;
        }
        return ans;
    }
};
