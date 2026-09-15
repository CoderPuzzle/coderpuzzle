#include <unordered_map>

class Solution {
  public:
    long long fixedRatio(string s, int num1, int num2) {
        // A substring's zeros z and ones o have ratio num1 : num2 exactly
        // when z*num2 == o*num1. With prefix counts Z, O, the substring
        // (l, r) qualifies exactly when Z[r]*num2 - O[r]*num1 equals
        // Z[l]*num2 - O[l]*num1, so counting pairs of equal prefix keys is
        // the whole task. The key reaches 10^5*10^5 = 10^10, so it is
        // stored as a long long.
        unordered_map<long long, long long> seen;
        seen[0] = 1;
        int z = 0;
        int o = 0;
        long long ans = 0;
        for (char ch : s) {
            if (ch == '0') {
                ++z;
            } else {
                ++o;
            }
            long long key = 1LL * z * num2 - 1LL * o * num1;
            ans += seen[key];
            ++seen[key];
        }
        return ans;
    }
};
