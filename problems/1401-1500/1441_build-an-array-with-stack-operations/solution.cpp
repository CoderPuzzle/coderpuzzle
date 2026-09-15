#include <string>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    std::vector<std::string> buildArray(std::vector<int> &target, int n) {
        std::unordered_set<int> wanted(target.begin(), target.end());
        int last = target.back();
        std::vector<std::string> operations;
        for (int value = 1; value <= last; value++) {
            operations.push_back("Push");
            if (wanted.find(value) == wanted.end()) {
                operations.push_back("Pop");
            }
        }
        return operations;
    }
};
