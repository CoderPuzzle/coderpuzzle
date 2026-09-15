class Solution {
  public:
    long long maxCount(int m, int n, vector<vector<int>> &ops) {
        // Every operation covers the prefix rectangle anchored at the top-left
        // corner, so the cells incremented by all of them form the rectangle
        // sized by the smallest a and the smallest b; only those cells can
        // hold the maximum. Starting both minima at m and n covers empty ops,
        // where every cell stays 0 and all m*n cells are maximal.
        int minA = m, minB = n;
        for (const vector<int> &op : ops) {
            if (op[0] < minA) {
                minA = op[0];
            }
            if (op[1] < minB) {
                minB = op[1];
            }
        }
        return (long long)minA * minB;
    }
};
