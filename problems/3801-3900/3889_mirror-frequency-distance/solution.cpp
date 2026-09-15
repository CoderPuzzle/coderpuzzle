#include <string>
#include <vector>

using namespace std;

class Solution {
  public:
    int mirrorFrequency(string s) {
        // 36 counters: 26 letters, then 10 digits.
        vector<int> freq(36, 0);
        for (char ch : s) {
            if (ch >= 'a' && ch <= 'z') {
                freq[ch - 'a']++;
            } else {
                freq[26 + ch - '0']++;
            }
        }
        int total = 0;
        // Letters fold into 13 mirror pairs (a,z), (b,y), ..., (m,n).
        for (int i = 0; i < 13; ++i) {
            int a = freq[i];
            int b = freq[25 - i];
            if (a + b > 0) {
                total += abs(a - b);
            }
        }
        // Digits fold into 5 mirror pairs (0,9), (1,8), ..., (4,5).
        for (int d = 0; d < 5; ++d) {
            int a = freq[26 + d];
            int b = freq[26 + 9 - d];
            if (a + b > 0) {
                total += abs(a - b);
            }
        }
        return total;
    }
};
