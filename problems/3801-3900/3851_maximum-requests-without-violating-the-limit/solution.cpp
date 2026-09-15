#include <algorithm>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    int maxRequests(vector<vector<int>> &requests, int k, int window) {
        // The limit is per user, so users never interact: group each user's
        // times, sort them, and greedily keep every time whose k-back kept
        // predecessor sits more than window away. The kept count is at most
        // the request count <= 10^5, so int arithmetic is exact throughout.
        unordered_map<int, vector<int>> byUser;
        for (const auto &r : requests) {
            byUser[r[0]].push_back(r[1]);
        }
        int total = 0;
        for (auto &[user, times] : byUser) {
            sort(times.begin(), times.end());
            vector<int> kept;
            kept.reserve(times.size());
            for (int t : times) {
                // Appending t is legal iff the k+1 last kept times span
                // strictly more than window: t - kept[size-k] > window.
                if ((int)kept.size() < k || t - kept[kept.size() - k] > window) {
                    kept.push_back(t);
                }
            }
            total += (int)kept.size();
        }
        return total;
    }
};
