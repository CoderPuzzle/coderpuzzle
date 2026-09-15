#include <algorithm>
#include <string>
#include <vector>

class Solution {
  public:
    std::string rankTeams(std::vector<std::string> &votes) {
        std::vector<bool> seen(26, false);
        for (char c : votes[0])
            seen[c - 'A'] = true;
        int p = static_cast<int>(votes[0].size());
        std::vector<std::vector<int>> counts(26, std::vector<int>(p, 0));
        for (const std::string &vote : votes) {
            for (int i = 0; i < static_cast<int>(vote.size()); i++) {
                counts[vote[i] - 'A'][i] += 1;
            }
        }
        std::vector<char> teams;
        for (char c = 'A'; c <= 'Z'; c++) {
            if (seen[c - 'A'])
                teams.push_back(c);
        }
        std::sort(teams.begin(), teams.end(), [&](char a, char b) {
            const std::vector<int> &ra = counts[a - 'A'];
            const std::vector<int> &rb = counts[b - 'A'];
            if (ra != rb)
                return ra > rb;
            return a < b;
        });
        return std::string(teams.begin(), teams.end());
    }
};
