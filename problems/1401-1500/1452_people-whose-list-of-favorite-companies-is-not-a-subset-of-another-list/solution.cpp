#include <unordered_set>
#include <vector>

class Solution {
  public:
    std::vector<int> peopleIndexes(std::vector<std::vector<std::string>> &favoriteCompanies) {
        std::vector<std::unordered_set<std::string>> sets;
        sets.reserve(favoriteCompanies.size());
        for (const std::vector<std::string> &companies : favoriteCompanies) {
            sets.emplace_back(companies.begin(), companies.end());
        }
        std::vector<int> result;
        for (int i = 0; i < (int)sets.size(); i++) {
            bool covered = false;
            for (int j = 0; j < (int)sets.size() && !covered; j++) {
                if (i == j || sets[j].size() <= sets[i].size()) {
                    continue;
                }
                bool inside = true;
                for (const std::string &company : favoriteCompanies[i]) {
                    if (sets[j].find(company) == sets[j].end()) {
                        inside = false;
                        break;
                    }
                }
                covered = inside;
            }
            if (!covered) {
                result.push_back(i);
            }
        }
        return result;
    }
};
