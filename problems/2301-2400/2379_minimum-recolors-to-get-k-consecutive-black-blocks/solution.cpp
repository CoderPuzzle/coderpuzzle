#include <string>

class Solution {
  public:
    int minimumRecolors(string blocks, int k) {
        // The answer is the window of k consecutive blocks containing the
        // fewest whites; a sliding window updates that count in O(1) as it
        // moves.
        int whites = 0;
        for (int i = 0; i < k; ++i) {
            if (blocks[i] == 'W') {
                ++whites;
            }
        }
        int best = whites;
        for (int right = k; right < static_cast<int>(blocks.size()); ++right) {
            whites += (blocks[right] == 'W') - (blocks[right - k] == 'W');
            best = std::min(best, whites);
        }
        return best;
    }
};
