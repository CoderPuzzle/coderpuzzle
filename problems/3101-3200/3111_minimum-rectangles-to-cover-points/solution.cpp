class Solution {
  public:
    int minRectanglesToCoverPoints(vector<vector<int>> &points, int w) {
        // Height never matters -- a rectangle's top may rise arbitrarily,
        // so its reach is just the x-interval [start, start + w]. Sorting
        // the x coordinates reduces the task to packing them into the
        // fewest windows of width w: plant a window at the first
        // uncovered point, drop everything it reaches, repeat. With both
        // coordinates <= 10**9 the difference x - anchor cannot overflow
        // an int.
        vector<int> xs;
        xs.reserve(points.size());
        for (const vector<int> &p : points) {
            xs.push_back(p[0]);
        }
        sort(xs.begin(), xs.end());
        int count = 1;
        int anchor = xs[0];
        for (size_t i = 1; i < xs.size(); i++) {
            if (xs[i] - anchor > w) {
                count++;
                anchor = xs[i];
            }
        }
        return count;
    }
};
