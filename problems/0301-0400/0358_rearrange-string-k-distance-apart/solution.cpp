#include <queue>
#include <string>
#include <utility>
#include <vector>

class Solution {
  public:
    string rearrangeString(string s, int k) {
        // Distance k apart is vacuous when k <= 1: any two positions already
        // qualify, and the pinned canonical returns s unchanged.
        if (k <= 1) {
            return s;
        }
        vector<int> counts(26, 0);
        for (char letter : s) {
            ++counts[letter - 'a'];
        }
        // Max-heap keyed by (count desc, letter asc) — the pinned pass order.
        // The comparator reports "lower priority", so ties fall to the
        // smaller letter.
        auto lowerPriority = [](const pair<int, int> &a, const pair<int, int> &b) {
            if (a.first != b.first) {
                return a.first < b.first;
            }
            return a.second > b.second;
        };
        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(lowerPriority)> heap(lowerPriority);
        for (int letter = 0; letter < 26; ++letter) {
            if (counts[letter] > 0) {
                heap.push({counts[letter], letter});
            }
        }
        string out;
        out.reserve(s.size());
        int total = (int)s.size();
        while (total > 0) {
            int take = min(k, (int)heap.size());
            // Fewer than k distinct letters while more remain: some window of
            // k consecutive positions would have to repeat a letter, so no
            // arrangement exists.
            if (take < k && total > take) {
                return "";
            }
            // Drain the pass before pushing back, so a letter never repeats
            // within its own pass.
            vector<pair<int, int>> taken;
            taken.reserve(take);
            for (int i = 0; i < take; ++i) {
                taken.push_back(heap.top());
                heap.pop();
            }
            for (const pair<int, int> &entry : taken) {
                out.push_back('a' + entry.second);
                --total;
                if (entry.first - 1 > 0) {
                    heap.push({entry.first - 1, entry.second});
                }
            }
        }
        return out;
    }
};
