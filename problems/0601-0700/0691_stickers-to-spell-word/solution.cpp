#include <array>
#include <queue>
#include <string>
#include <vector>

class Solution {
  public:
    int minStickers(vector<string> &stickers, string target) {
        // BFS over the bitmask of spelled target positions: bit i is set
        // once position i holds a cut letter. From each state, one copy of
        // a sticker spends its letters on the uncovered positions left to
        // right — covering more positions with the same single copy can
        // never hurt, since equal letters are interchangeable. Layers of
        // the BFS are sticker counts, so the first visit to the full mask
        // is the minimum; a target letter found on no sticker at all makes
        // the task impossible.
        int m = target.size();
        int full = (1 << m) - 1;
        vector<int> need(m);
        array<bool, 26> available{};
        for (const string &word : stickers) {
            for (char letter : word) {
                available[letter - 'a'] = true;
            }
        }
        for (int i = 0; i < m; ++i) {
            need[i] = target[i] - 'a';
            if (!available[need[i]]) {
                return -1;
            }
        }
        vector<array<int, 26>> stocks;
        stocks.reserve(stickers.size());
        for (const string &word : stickers) {
            array<int, 26> counts{};
            for (char letter : word) {
                counts[letter - 'a']++;
            }
            stocks.push_back(counts);
        }
        vector<int> distance(full + 1, -1);
        distance[0] = 0;
        queue<int> pending;
        pending.push(0);
        while (!pending.empty()) {
            int mask = pending.front();
            pending.pop();
            if (mask == full) {
                return distance[mask];
            }
            int steps = distance[mask] + 1;
            for (const array<int, 26> &counts : stocks) {
                array<int, 26> remaining = counts;
                int next = mask;
                for (int i = 0; i < m; ++i) {
                    int bit = 1 << i;
                    if ((mask & bit) == 0 && remaining[need[i]] > 0) {
                        remaining[need[i]]--;
                        next |= bit;
                    }
                }
                if (next != mask && distance[next] < 0) {
                    distance[next] = steps;
                    pending.push(next);
                }
            }
        }
        return -1;
    }
};
