#include <string>
#include <vector>

class Solution {
  public:
    std::string stringShift(std::string s, std::vector<std::vector<int>> &shift) {
        int net = 0;
        for (const std::vector<int> &operation : shift) {
            net += operation[0] == 0 ? operation[1] : -operation[1];
        }
        int n = (int)s.size();
        int k = ((net % n) + n) % n;
        return s.substr(k) + s.substr(0, k);
    }
};
