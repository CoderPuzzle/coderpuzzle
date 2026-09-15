#include <vector>

class Solution {
  public:
    std::vector<int> numOfBurgers(int tomatoSlices, int cheeseSlices) {
        // Solve the system: 4J + 2S = tomatoes, J + S = cheese. Doubling
        // the cheese equation and subtracting isolates jumbo:
        // 2J = tomatoes - 2*cheese. The pair exists iff that value is a
        // non-negative even integer and the back-solved small count is
        // non-negative too.
        long long twoJumbo = static_cast<long long>(tomatoSlices) - 2LL * cheeseSlices;
        if (twoJumbo < 0 || twoJumbo % 2 != 0) {
            return {};
        }
        long long jumbo = twoJumbo / 2;
        long long small = static_cast<long long>(cheeseSlices) - jumbo;
        if (small < 0) {
            return {};
        }
        return {static_cast<int>(jumbo), static_cast<int>(small)};
    }
};
