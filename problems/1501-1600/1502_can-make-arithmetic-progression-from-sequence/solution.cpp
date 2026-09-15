class Solution {
  public:
    bool canMakeArithmeticProgression(vector<int> &arr) {
        // Sorting produces the one arrangement that could possibly be a
        // valid progression; check its consecutive gaps are all equal.
        vector<int> a = arr;
        sort(a.begin(), a.end());
        long long diff = (long long)a[1] - a[0];
        for (size_t i = 2; i < a.size(); ++i) {
            if ((long long)a[i] - a[i - 1] != diff) {
                return false;
            }
        }
        return true;
    }
};
