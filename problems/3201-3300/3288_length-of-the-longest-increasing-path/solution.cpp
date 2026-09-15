#include <algorithm>
#include <utility>
#include <vector>

class Solution {
  public:
    int maxPathLength(std::vector<std::vector<int>> &coordinates, int k) {
        const int pivotX = coordinates[k][0];
        const int pivotY = coordinates[k][1];
        std::vector<std::pair<int, int>> below;
        std::vector<std::pair<int, int>> above;
        for (const auto &point : coordinates) {
            if (point[0] < pivotX && point[1] < pivotY) {
                below.emplace_back(point[0], point[1]);
            } else if (point[0] > pivotX && point[1] > pivotY) {
                above.emplace_back(point[0], point[1]);
            }
        }
        return 1 + longestChain(below) + longestChain(above);
    }

  private:
    static int longestChain(std::vector<std::pair<int, int>> &points) {
        std::sort(points.begin(), points.end(), [](const auto &a, const auto &b) {
            if (a.first != b.first) {
                return a.first < b.first;
            }
            return a.second > b.second;
        });
        std::vector<int> tails;
        for (const auto &point : points) {
            auto slot = std::lower_bound(tails.begin(), tails.end(), point.second);
            if (slot == tails.end()) {
                tails.push_back(point.second);
            } else {
                *slot = point.second;
            }
        }
        return (int)tails.size();
    }
};
