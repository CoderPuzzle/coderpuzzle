#include <vector>

using namespace std;

class Solution {
  public:
    int minimumIndex(vector<int> &capacity, int itemSize) {
        // The earliest index wins ties, so only a strictly smaller
        // fitting capacity replaces the current best.
        int bestIndex = -1;
        int bestCapacity = 1 << 30;
        for (int i = 0; i < (int)capacity.size(); i++) {
            if (capacity[i] >= itemSize && capacity[i] < bestCapacity) {
                bestCapacity = capacity[i];
                bestIndex = i;
            }
        }
        return bestIndex;
    }
};
