class Solution {
  public:
    int minMoves(vector<vector<int>> &rooks) {
        // Horizontal and vertical moves touch disjoint coordinates, and a
        // peaceful board needs row indices {0..n-1} once each (columns
        // too). So each axis decouples: pair the k-th smallest coordinate
        // of that axis with target index k-1 — rearrangement keeps this
        // optimal. Worst case per axis is n*(n-1)/2 <= 124750, so the sum
        // cannot overflow int.
        vector<int> xs, ys;
        for (const vector<int> &rook : rooks) {
            xs.push_back(rook[0]);
            ys.push_back(rook[1]);
        }
        sort(xs.begin(), xs.end());
        sort(ys.begin(), ys.end());
        int moves = 0;
        for (int i = 0; i < (int)rooks.size(); ++i) {
            moves += abs(xs[i] - i) + abs(ys[i] - i);
        }
        return moves;
    }
};
