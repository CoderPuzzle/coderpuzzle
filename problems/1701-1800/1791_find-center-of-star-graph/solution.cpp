class Solution {
  public:
    int findCenter(vector<vector<int>> &edges) {
        // The center lies on every edge, so it is the one node shared by
        // the first two edges; every other node occurs in exactly one edge.
        int a = edges[0][0], b = edges[0][1];
        int c = edges[1][0], d = edges[1][1];
        if (a == c || a == d) {
            return a;
        }
        return b;
    }
};
