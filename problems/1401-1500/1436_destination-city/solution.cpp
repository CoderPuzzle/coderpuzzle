#include <string>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    std::string destCity(std::vector<std::vector<std::string>> &paths) {
        std::unordered_set<std::string> sources;
        for (const std::vector<std::string> &path : paths) {
            sources.insert(path[0]);
        }
        for (const std::vector<std::string> &path : paths) {
            if (sources.find(path[1]) == sources.end()) {
                return path[1];
            }
        }
        return "";
    }
};
