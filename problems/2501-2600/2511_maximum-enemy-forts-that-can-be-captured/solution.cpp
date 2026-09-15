#include <vector>

class Solution {
  public:
    int captureForts(std::vector<int> &forts) {
        // A move is only possible between two non-zero entries separated
        // by enemy forts, and it captures when the two ends differ (your
        // fort 1 -> empty -1 in either direction). One scan remembers the
        // previous non-zero position; every new non-zero closes the
        // stretch of zeros since then, so the best differing gap seen is
        // exactly the most enemy forts capturable.
        int best = 0;
        int last = -1;
        for (int i = 0; i < static_cast<int>(forts.size()); i++) {
            if (forts[i] == 0)
                continue;
            if (last >= 0 && forts[i] != forts[last])
                best = std::max(best, i - last - 1);
            last = i;
        }
        return best;
    }
};
