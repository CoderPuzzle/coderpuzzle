class Solution {
  public:
    int lowerBound(vector<int> &lengths, int x) {
        int lo = 0, hi = lengths.size();
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (lengths[mid] >= x) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    vector<int> countRectangles(vector<vector<int>> &rectangles, vector<vector<int>> &points) {
        vector<vector<int>> byHeight(101);
        for (auto &rect : rectangles) {
            byHeight[rect[1]].push_back(rect[0]);
        }
        for (auto &lengths : byHeight) {
            sort(lengths.begin(), lengths.end());
        }

        vector<int> count;
        count.reserve(points.size());
        for (auto &point : points) {
            int x = point[0], y = point[1];
            int total = 0;
            for (int h = y; h <= 100; h++) {
                total += static_cast<int>(byHeight[h].size()) - lowerBound(byHeight[h], x);
            }
            count.push_back(total);
        }
        return count;
    }
};
