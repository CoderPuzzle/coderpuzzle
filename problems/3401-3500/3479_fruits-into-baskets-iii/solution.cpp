class Solution {
  public:
    int numOfUnplacedFruits(vector<int> &fruits, vector<int> &baskets) {
        // Max segment tree over basket indices: each node holds the largest
        // capacity still free in its range, so "any basket here fits?" is one
        // comparison and the leftmost such basket is a root-to-leaf walk that
        // keeps left whenever the left subtree can still fit the fruit.
        int n = (int)baskets.size();
        int size = 1;
        while (size < n) {
            size *= 2;
        }
        vector<int> tree(2 * size, 0);
        for (int j = 0; j < n; ++j) {
            tree[size + j] = baskets[j];
        }
        for (int i = size - 1; i > 0; --i) {
            tree[i] = max(tree[2 * i], tree[2 * i + 1]);
        }
        int unplaced = 0;
        for (int quantity : fruits) {
            if (tree[1] < quantity) {
                // even the global maximum is too small: nothing fits anywhere
                ++unplaced;
                continue;
            }
            int node = 1;
            while (node < size) {
                node *= 2;
                if (tree[node] < quantity) {
                    node += 1;
                }
            }
            // retire the basket: 0 sits below every legal capacity
            tree[node] = 0;
            node /= 2;
            while (node > 0) {
                tree[node] = max(tree[2 * node], tree[2 * node + 1]);
                node /= 2;
            }
        }
        return unplaced;
    }
};
