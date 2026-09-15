#include <algorithm>
#include <numeric>
#include <vector>

class Solution {
  public:
    long long dividePlayers(vector<int> &skill) {
        // The team total is fixed: the sum of all skills split evenly over
        // n / 2 teams. If the sum does not divide, no pairing can be even.
        // Otherwise the sorted array forces the weakest and strongest into
        // a team, which the two pointers check and price in one pass.
        int n = (int)skill.size();
        int teams = n / 2;
        long long total = accumulate(skill.begin(), skill.end(), 0LL);
        if (total % teams != 0) {
            return -1;
        }
        long long target = total / teams;

        sort(skill.begin(), skill.end());
        long long chemistry = 0;
        int i = 0;
        int j = n - 1;
        while (i < j) {
            if ((long long)skill[i] + skill[j] != target) {
                return -1;
            }
            chemistry += (long long)skill[i] * skill[j];
            i++;
            j--;
        }
        return chemistry;
    }
};
