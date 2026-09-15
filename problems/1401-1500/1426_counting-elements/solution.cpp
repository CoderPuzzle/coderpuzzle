#include <unordered_set>
#include <vector>

class Solution {
  public:
    int countElements(std::vector<int> &arr) {
        std::unordered_set<int> seen(arr.begin(), arr.end());
        int count = 0;
        for (int x : arr) {
            if (seen.count(x + 1)) {
                count++;
            }
        }
        return count;
    }
};
