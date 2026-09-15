#include <algorithm>
#include <string>

class Solution {
  public:
    // Binary search the answer m. m == 1 needs full alternation, so the cost
    // is the smaller Hamming distance to one of the two alternating targets;
    // for m >= 2 a run of length L independently costs floor(L / (m + 1))
    // flips, all placeable strictly inside the run so runs never merge.
    int minLength(std::string s, int numOps) {
        int n = s.size();
        int lo = 1, hi = n;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (ok(s, numOps, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

  private:
    bool ok(const std::string &s, int numOps, int m) {
        int n = s.size();
        if (m == 1) {
            int alt = 0;
            for (int i = 0; i < n; i++) {
                alt += s[i] != "01"[i % 2];
            }
            return std::min(alt, n - alt) <= numOps;
        }
        int flips = 0, run = 1;
        for (int i = 1; i < n; i++) {
            if (s[i] == s[i - 1]) {
                run++;
            } else {
                flips += run / (m + 1);
                run = 1;
            }
        }
        return flips + run / (m + 1) <= numOps;
    }
};
