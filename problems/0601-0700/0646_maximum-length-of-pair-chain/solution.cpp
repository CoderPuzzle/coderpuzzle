class Solution {
  public:
    int findLongestChain(vector<vector<int>> &pairs) {
        // Taking the compatible pair that ends earliest leaves the most room,
        // so sorting by right endpoint makes a single greedy pass optimal.
        sort(pairs.begin(), pairs.end(), [](const vector<int> &a, const vector<int> &b) { return a[1] < b[1]; });
        int length = 0;
        long long currentEnd = LLONG_MIN;
        for (const auto &pair : pairs) {
            // Strict > encodes the strict b < c rule; touching pairs can't chain.
            if (pair[0] > currentEnd) {
                ++length;
                currentEnd = pair[1];
            }
        }
        return length;
    }
};
