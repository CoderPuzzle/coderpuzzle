class Solution {
  public:
    vector<vector<int>> kClosest(vector<vector<int>> &points, int k) {
        vector<vector<int>> pts = points;
        // Squared distance ranks points identically to the Euclidean
        // distance (sqrt is monotone) while staying integer-exact.
        stable_sort(pts.begin(), pts.end(), [](const vector<int> &a, const vector<int> &b) {
            return a[0] * a[0] + a[1] * a[1] < b[0] * b[0] + b[1] * b[1];
        });
        pts.resize(k);
        return pts;
    }
};
