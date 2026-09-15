class Solution {
  public:
    double trimMean(vector<int> &arr) {
        vector<int> a = arr;
        sort(a.begin(), a.end());
        int n = a.size();
        int trim = n / 20; // 5% of n, always a whole number since n is a multiple of 20
        double total = 0;
        for (int i = trim; i < n - trim; i++) {
            total += a[i];
        }
        return total / (n - 2 * trim);
    }
};
