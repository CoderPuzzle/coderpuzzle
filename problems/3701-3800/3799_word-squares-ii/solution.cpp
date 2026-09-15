#include <algorithm>
#include <string>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    std::vector<std::vector<std::string>> wordSquares(std::vector<std::string> &words) {
        std::unordered_map<char, std::vector<std::string>> byFirst;
        std::unordered_map<char, std::vector<std::string>> byLast;
        for (const std::string &word : words) {
            byFirst[word[0]].push_back(word);
            byLast[word[3]].push_back(word);
        }
        std::vector<std::string> sorted = words;
        std::sort(sorted.begin(), sorted.end());
        std::vector<std::vector<std::string>> res;
        for (const std::string &top : sorted) {
            for (const std::string &left : byFirst[top[0]]) {
                if (left == top) {
                    continue;
                }
                for (const std::string &right : byFirst[top[3]]) {
                    if (right == top || right == left) {
                        continue;
                    }
                    for (const std::string &bottom : byLast[right[3]]) {
                        if (bottom[0] != left[3]) {
                            continue;
                        }
                        if (bottom == top || bottom == left || bottom == right) {
                            continue;
                        }
                        res.push_back({top, left, right, bottom});
                    }
                }
            }
        }
        std::sort(res.begin(), res.end());
        return res;
    }
};
