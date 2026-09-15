#include <algorithm>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>

class Solution {
  public:
    int countPairs(vector<int> &nums) {
        // Splitting the two operations between the numbers never helps:
        // the minimum number of digit swaps turning one padded string into
        // another obeys the triangle inequality, so x and y are almost
        // equal exactly when y is reachable from x by <= 2 swaps of x's
        // own digits, compared with leading zeros padded to the longer
        // length (that is how 1023 becomes 0213 = 213 and 1 meets 100).
        //
        // Pad every number to the widest width w (<= 7), enumerate all
        // values reachable by 0, 1, or 2 swaps (at most 1 + C(w,2) +
        // C(w,2)^2 deduplicated states), and sweep left to right: add the
        // frequencies of already-seen numbers found in the reachable set,
        // then record the current number. Each pair is counted once, via
        // the later element querying the earlier one's actual value.
        int widest = 0;
        for (int x : nums) {
            widest = max(widest, x);
        }
        int w = (int)to_string(widest).size();
        vector<pair<int, int>> pairs;
        for (int i = 0; i < w; ++i) {
            for (int j = i + 1; j < w; ++j) {
                pairs.push_back({i, j});
            }
        }
        unordered_map<int, int> seen;
        int ans = 0;
        for (int x : nums) {
            string d(w, '0');
            string s = to_string(x);
            for (int k = 0; k < (int)s.size(); ++k) {
                d[w - (int)s.size() + k] = s[k];
            }
            unordered_set<int> states;
            states.insert(stoi(d));
            for (auto [i, j] : pairs) {
                swap(d[i], d[j]);
                states.insert(stoi(d));
                for (auto [k, l] : pairs) {
                    swap(d[k], d[l]);
                    states.insert(stoi(d));
                    swap(d[k], d[l]);
                }
                swap(d[i], d[j]);
            }
            for (int v : states) {
                auto it = seen.find(v);
                if (it != seen.end()) {
                    ans += it->second;
                }
            }
            ++seen[x];
        }
        return ans;
    }
};
