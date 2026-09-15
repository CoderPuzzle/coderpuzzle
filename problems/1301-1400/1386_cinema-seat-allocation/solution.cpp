#include <cstdint>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    int maxNumberOfFamilies(int n, std::vector<std::vector<int>> &reservedSeats) {
        constexpr int LEFT = 0b0000011110;   // seats 2-5
        constexpr int RIGHT = 0b0111100000;  // seats 6-9
        constexpr int MIDDLE = 0b0001111000; // seats 4-7
        std::unordered_map<int, int> masks;
        for (const auto &seat : reservedSeats) {
            masks[seat[0]] |= 1 << (seat[1] - 1);
        }
        long long groups = 2LL * (n - static_cast<long long>(masks.size()));
        for (const auto &[row, mask] : masks) {
            if ((mask & (LEFT | RIGHT)) == 0) {
                groups += 2;
            } else if ((mask & LEFT) == 0 || (mask & MIDDLE) == 0 || (mask & RIGHT) == 0) {
                groups += 1;
            }
        }
        return static_cast<int>(groups);
    }
};
