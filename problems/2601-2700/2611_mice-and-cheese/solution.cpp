class Solution {
  public:
    int miceAndCheese(vector<int> &reward1, vector<int> &reward2, int k) {
        // Start from the second mouse eating everything, then hand k cheeses
        // to the first mouse. Swapping cheese i changes the total by
        // reward1[i] - reward2[i], so the k swaps with the largest gains are
        // optimal — gains may be negative when forced, and taking the top k
        // regardless is exactly what "exactly k" demands.
        int n = reward1.size();
        vector<int> gains(n);
        long long total = 0;
        for (int i = 0; i < n; ++i) {
            total += reward2[i];
            gains[i] = reward1[i] - reward2[i];
        }
        sort(gains.begin(), gains.end(), greater<int>());
        for (int i = 0; i < k; ++i)
            total += gains[i];
        return (int)total;
    }
};
