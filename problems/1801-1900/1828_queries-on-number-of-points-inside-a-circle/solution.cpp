class Solution {
  public:
    // A point lies in the circle exactly when its squared euclidean
    // distance to the center is at most r*r. Squaring keeps everything
    // in integers (values stay below 2*500*500), so border points are
    // judged exactly where sqrt rounding could misclassify them.
    vector<int> countPoints(vector<vector<int>> &points, vector<vector<int>> &queries) {
        vector<int> answer;
        answer.reserve(queries.size());
        for (const auto &q : queries) {
            const int xj = q[0], yj = q[1], rr = q[2] * q[2];
            int count = 0;
            for (const auto &p : points) {
                const int dx = p[0] - xj, dy = p[1] - yj;
                if (dx * dx + dy * dy <= rr)
                    count++;
            }
            answer.push_back(count);
        }
        return answer;
    }
};
