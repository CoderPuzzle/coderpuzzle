class Solution {
  public:
    bool canArrange(vector<int> &arr, int k) {
        vector<int> freq(k, 0);
        for (int x : arr) {
            int r = x % k;
            if (r < 0)
                r += k;
            freq[r] += 1;
        }
        // the zero class must pair within itself -> even count
        if (freq[0] % 2 != 0)
            return false;
        // complementary classes r and k-r must match exactly (any pairing
        // inside matched classes works, so counts alone decide)
        for (int i = 1; i <= k / 2; i++) {
            if (freq[i] != freq[k - i])
                return false;
        }
        return true;
    }
};
