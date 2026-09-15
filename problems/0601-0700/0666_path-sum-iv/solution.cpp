class Solution {
  public:
    int pathSum(vector<int> &nums) {
        // The first two digits of each code are the node's (depth, position);
        // keying a map by them turns the array into the tree itself. A node
        // is a leaf exactly when neither child position exists one level
        // down, and a child at (d, p) hangs from the parent at
        // (d - 1, (p + 1) / 2), so each leaf, walked up to the root,
        // accumulates its whole path.
        unordered_map<int, int> tree;
        for (int code : nums) {
            tree[code / 10] = code % 10;
        }
        int total = 0;
        for (int code : nums) {
            int d = code / 100, p = code / 10 % 10;
            int left = (d + 1) * 10 + 2 * p - 1;
            if (tree.count(left) || tree.count(left + 1)) {
                continue;
            }
            while (d > 0) {
                total += tree[d * 10 + p];
                p = (p + 1) / 2;
                d--;
            }
        }
        return total;
    }
};
