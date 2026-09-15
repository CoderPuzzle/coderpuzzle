#include <algorithm>
#include <string>
#include <utility>
#include <vector>

class Solution {
  public:
    string splitLoopedString(vector<string> &strs) {
        // Every string except the breakpoint carrier stands at max(s, s
        // reversed) - fixed slot lengths make per-string maxima optimal.
        // The breakpoint string itself is tried in BOTH orientations at
        // every cut, its suffix leading the regular string and its prefix
        // closing it, wrapped around the others' standing forms in loop
        // order.
        size_t n = strs.size();
        vector<string> best(n);
        for (size_t i = 0; i < n; ++i) {
            string rev = strs[i];
            reverse(rev.begin(), rev.end());
            best[i] = max(strs[i], rev);
        }
        string ans;
        for (size_t i = 0; i < n; ++i) {
            string rest;
            for (size_t j = 1; j < n; ++j) {
                rest += best[(i + j) % n];
            }
            string rev = strs[i];
            reverse(rev.begin(), rev.end());
            for (const string &t : {strs[i], rev}) {
                for (size_t k = 0; k < t.size(); ++k) {
                    string cand = t.substr(k) + rest + t.substr(0, k);
                    if (cand > ans) {
                        ans = std::move(cand);
                    }
                }
            }
        }
        return ans;
    }
};
