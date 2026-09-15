#include <vector>

class Solution {
  public:
    int numOfMinutes(int n, int headID, std::vector<int> &manager, std::vector<int> &informTime) {
        // arrival[i] = minutes until employee i starts spreading the news.
        std::vector<long long> arrival(n, -1);
        arrival[headID] = 0;
        long long best = 0;
        for (int employee = 0; employee < n; employee++) {
            if (arrival[employee] >= 0) {
                best = std::max(best, arrival[employee]);
                continue;
            }
            // Walk up the chain of unresolved managers, then unwind downward.
            std::vector<int> chain;
            chain.reserve(64);
            int current = employee;
            while (arrival[current] < 0) {
                chain.push_back(current);
                current = manager[current];
            }
            for (int k = static_cast<int>(chain.size()) - 1; k >= 0; k--) {
                int boss = manager[chain[k]];
                arrival[chain[k]] = arrival[boss] + informTime[boss];
            }
            best = std::max(best, arrival[employee]);
        }
        return static_cast<int>(best);
    }
};
