#include <string>
#include <vector>

class Solution {
  public:
    std::vector<std::string> stringMatching(std::vector<std::string> &words) {
        std::vector<std::string> result;
        for (int i = 0; i < (int)words.size(); i++) {
            for (int j = 0; j < (int)words.size(); j++) {
                if (j != i && words[j].find(words[i]) != std::string::npos) {
                    result.push_back(words[i]);
                    break;
                }
            }
        }
        return result;
    }
};
