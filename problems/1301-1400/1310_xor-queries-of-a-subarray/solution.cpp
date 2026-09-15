class Solution {
  public:
    vector<int> xorQueries(vector<int> &arr, vector<vector<int>> &queries) {
        int n = arr.size();
        // prefix[t] = XOR of the first t elements (prefix[0] = 0).
        vector<int> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] ^ arr[i];
        }
        // Self-inverse XOR telescopes: elements before l appear in both
        // operands and annihilate, leaving exactly arr[l..r] — O(1) per query.
        vector<int> result;
        result.reserve(queries.size());
        for (const auto &q : queries) {
            result.push_back(prefix[q[1] + 1] ^ prefix[q[0]]);
        }
        return result;
    }
};
