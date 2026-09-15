class Solution {
  public:
    int countPairs(vector<int> &nums, int low, int high) {
        long long below = low > 0 ? pairsLe(nums, low - 1) : 0;
        return (int)(pairsLe(nums, high) - below);
    }

  private:
    long long pairsLe(vector<int> &nums, int k) {
        const int BITS = 16;
        int maxNodes = (int)nums.size() * BITS + 2;
        vector<array<int, 2>> child(maxNodes, {0, 0}); // 0 = none, root = 1
        vector<long long> count(maxNodes, 0);
        int nodes = 1;
        long long total = 0;
        for (int x : nums) {
            // Query the trie of previously inserted numbers.
            int node = 1;
            for (int b = BITS - 1; b >= 0 && node != 0; b--) {
                int xb = (x >> b) & 1;
                if ((k >> b) & 1) {
                    int c = child[node][xb];
                    if (c != 0) {
                        total += count[c];
                    }
                    node = child[node][1 - xb];
                } else {
                    node = child[node][xb];
                }
            }
            if (node != 0) {
                total += count[node];
            }
            // Insert x.
            count[1] += 1;
            node = 1;
            for (int b = BITS - 1; b >= 0; b--) {
                int d = (x >> b) & 1;
                int nxt = child[node][d];
                if (nxt == 0) {
                    nodes += 1;
                    nxt = nodes;
                    child[node][d] = nxt;
                }
                node = nxt;
                count[node] += 1;
            }
        }
        return total;
    }
};
