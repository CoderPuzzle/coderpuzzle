class Solution {
  public:
    vector<int> kthSmallestPrimeFraction(vector<int> &arr, int k) {
        int n = arr.size();
        double lo = 0.0, hi = 1.0;
        vector<int> ans = {arr[0], arr[n - 1]};
        // Binary search on the fraction value; count fractions <= mid.
        for (int it = 0; it < 50; it++) {
            double mid = (lo + hi) / 2.0;
            int count = 0;
            double best = 0.0;
            vector<int> bestPair = {arr[0], arr[n - 1]};
            int j = 1;
            for (int i = 0; i < n - 1; i++) {
                while (j < n && arr[i] > mid * arr[j]) {
                    j += 1;
                }
                count += n - j;
                if (j < n) {
                    double val = (double)arr[i] / arr[j];
                    if (val > best) {
                        best = val;
                        bestPair = {arr[i], arr[j]};
                    }
                }
            }
            if (count >= k) {
                hi = mid;
                ans = bestPair;
            } else {
                lo = mid;
            }
        }
        return ans;
    }
};
