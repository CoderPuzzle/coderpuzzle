#include <algorithm>
#include <string>

using namespace std;

class Solution {
  public:
    int minOperations(string s) {
        // A proper substring cannot sort a length-two string, so a
        // descending pair is impossible; otherwise the answer is decided
        // by where the smallest and largest characters appear.
        int n = (int)s.size();
        if (is_sorted(s.begin(), s.end())) {
            return 0;
        }
        if (n == 2) {
            return -1;
        }
        char mn = *min_element(s.begin(), s.end());
        char mx = *max_element(s.begin(), s.end());
        if (s[0] == mn || s[n - 1] == mx) {
            return 1;
        }
        for (int i = 1; i + 1 < n; i++) {
            if (s[i] == mn || s[i] == mx) {
                return 2;
            }
        }
        return 3;
    }
};
