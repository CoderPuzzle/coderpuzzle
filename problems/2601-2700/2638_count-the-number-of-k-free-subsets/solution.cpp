class Solution {
  public:
    long long countTheNumOfKFreeSubsets(vector<int> &nums, int k) {
        vector<int> sorted(nums);
        sort(sorted.begin(), sorted.end());
        // Two elements conflict only when they differ by exactly k, which
        // chains values into arithmetic sequences: x joins x - k's group
        // when that predecessor exists, else starts a new one. Any
        // conflicting pair lands in the same chain, so groups are
        // independent.
        unordered_map<int, int> groupOf;
        vector<long long> lengths;
        for (int x : sorted) {
            auto it = groupOf.find(x - k);
            if (it != groupOf.end()) {
                groupOf[x] = it->second;
                lengths[it->second] += 1;
            } else {
                groupOf[x] = (int)lengths.size();
                lengths.push_back(1);
            }
        }
        // Product over chains; 1 counts the empty subset of the whole array.
        long long ans = 1;
        for (long long length : lengths) {
            // A k-free subset of a chain omits chain-adjacent members —
            // independent sets of a path. dp[i] = dp[i-1] + dp[i-2] is a
            // Fibonacci shift; after `length` steps b is the chain's count.
            long long a = 1, b = 1;
            for (long long t = 0; t < length; t++) {
                long long nb = a + b;
                a = b;
                b = nb;
            }
            ans *= b;
        }
        return ans;
    }
};
