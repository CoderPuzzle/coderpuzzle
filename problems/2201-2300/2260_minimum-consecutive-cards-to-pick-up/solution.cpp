#include <unordered_map>
#include <vector>

class Solution {
  public:
    int minimumCardPickup(std::vector<int> &cards) {
        std::unordered_map<int, int> last;
        int best = INT_MAX;
        for (int i = 0; i < static_cast<int>(cards.size()); i++) {
            auto it = last.find(cards[i]);
            if (it != last.end() && i - it->second + 1 < best) {
                best = i - it->second + 1;
            }
            last[cards[i]] = i;
        }
        return best == INT_MAX ? -1 : best;
    }
};
