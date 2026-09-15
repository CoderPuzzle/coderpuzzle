#include <string>
#include <unordered_set>

class Solution {
  public:
    bool isPathCrossing(std::string path) {
        long long x = 0, y = 0;
        std::unordered_set<long long> visited;
        visited.insert(encode(0, 0));
        for (char step : path) {
            if (step == 'N') {
                ++y;
            } else if (step == 'S') {
                --y;
            } else if (step == 'E') {
                ++x;
            } else {
                --x;
            }
            if (!visited.insert(encode(x, y)).second) {
                return true;
            }
        }
        return false;
    }

  private:
    static long long encode(long long x, long long y) { return ((x + 100000LL) << 32) | (y + 100000LL); }
};
