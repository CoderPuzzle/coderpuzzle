#include <numeric>
#include <string>
#include <vector>

class Solution {
  public:
    std::vector<std::string> simplifiedFractions(int n) {
        std::vector<std::string> result;
        for (int numer = 1; numer < n; numer++) {
            for (int denom = numer + 1; denom <= n; denom++) {
                if (std::gcd(numer, denom) == 1) {
                    result.push_back(std::to_string(numer) + "/" + std::to_string(denom));
                }
            }
        }
        return result;
    }
};
