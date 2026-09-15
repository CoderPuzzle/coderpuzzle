class Solution {
  public:
    long long putMarbles(vector<int> &weights, int k) {
        // One bag means no cuts — a correctness guard, not an optimization:
        // the general formula's indexing does not describe the k = 1 case.
        if (k == 1) {
            return 0;
        }
        // Each bag costs the sum of its endpoints, and weights[0] +
        // weights[n-1] appear in every distribution's score, so they cancel
        // in the max-minus-min difference. Only the k-1 internal cuts matter:
        // cutting between i and i+1 adds weights[i] + weights[i+1].
        int n = weights.size();
        vector<long long> adj(n - 1);
        for (int i = 0; i + 1 < n; i++) {
            adj[i] = (long long)weights[i] + weights[i + 1];
        }
        sort(adj.begin(), adj.end());
        // Max score takes the m largest cut sums, min the m smallest; their
        // difference is the answer.
        int m = k - 1;
        long long ans = 0;
        for (int i = 0; i < m; i++) {
            ans += adj[n - 2 - i] - adj[i];
        }
        return ans;
    }
};
