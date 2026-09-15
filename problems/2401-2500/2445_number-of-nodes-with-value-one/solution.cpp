class Solution {
  public:
    int numberOfNodes(int n, vector<int> &queries) {
        // Order does not matter -- only how many times each subtree was
        // flipped. A node v's final value is the parity of (flips queried
        // on v) + (flips queried on every ancestor of v), since each such
        // query covers v too. Count queries per label, then sweep labels
        // 1..n passing accumulated flip counts parent -> child; the tree
        // shape guarantees the parent index v / 2 is already finished.
        vector<int> counts(n + 1, 0);
        for (int q : queries) {
            ++counts[q];
        }
        vector<int> flips(n + 1, 0);
        int total = 0;
        for (int v = 1; v <= n; ++v) {
            flips[v] = (v >= 2 ? flips[v / 2] : 0) + counts[v];
            total += flips[v] % 2;
        }
        return total;
    }
};
