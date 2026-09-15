#include <algorithm>
#include <cmath>
#include <vector>

class Solution {
  public:
    std::vector<double> internalAngles(std::vector<int> &sides) {
        std::vector<int> ordered = sides;
        std::sort(ordered.begin(), ordered.end());
        if (ordered[0] + ordered[1] <= ordered[2]) {
            return {};
        }

        std::vector<double> result;
        result.reserve(3);
        for (int i = 0; i < 3; ++i) {
            int opposite = ordered[i];
            int adjacent1 = ordered[(i + 1) % 3];
            int adjacent2 = ordered[(i + 2) % 3];
            double cosine =
                ((double)adjacent1 * adjacent1 + (double)adjacent2 * adjacent2 - (double)opposite * opposite) /
                (2.0 * adjacent1 * adjacent2);
            double angle = std::acos(std::max(-1.0, std::min(1.0, cosine))) * 180.0 / std::acos(-1.0);
            result.push_back(std::round(angle * 100000.0) / 100000.0);
        }
        return result;
    }
};
