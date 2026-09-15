#include <algorithm>
#include <climits>
#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
  public:
    long long finishTime(int n, vector<vector<int>> &edges, vector<int> &baseTime) {
        // Rerooting DP: down[] finishes each side with the parent direction
        // excluded, up[] mirrors the value flowing back from the parent side.
        // Answers reach n * max(baseTime) = 10^10, so all values stay long long.
        vector<vector<int>> adjacency(n);
        for (auto &edge : edges) {
            adjacency[edge[0]].push_back(edge[1]);
            adjacency[edge[1]].push_back(edge[0]);
        }
        vector<int> parent(n, -1);
        parent[0] = -2;
        vector<int> order;
        order.reserve(n);
        order.push_back(0);
        for (int head = 0; head < (int)order.size(); ++head) {
            for (int next : adjacency[order[head]]) {
                if (parent[next] == -1) {
                    parent[next] = order[head];
                    order.push_back(next);
                }
            }
        }
        vector<long long> down(n);
        for (int i = n - 1; i >= 0; --i) {
            int v = order[i];
            long long low = LLONG_MAX;
            long long high = LLONG_MIN; // smallest / largest finish among children
            for (int w : adjacency[v]) {
                if (w != parent[v]) {
                    low = min(low, down[w]);
                    high = max(high, down[w]);
                }
            }
            // A leaf role stops at the task's own duration.
            down[v] = low == LLONG_MAX ? baseTime[v] : high + (high - low) + baseTime[v];
        }
        vector<long long> up(n);
        long long best = LLONG_MAX;
        for (int step = 0; step < n; ++step) {
            int v = order[step];
            vector<long long> incoming; // values flowing into v
            unordered_map<int, int> slots;
            for (int w : adjacency[v]) {
                if (w != parent[v]) {
                    slots[w] = (int)incoming.size();
                    incoming.push_back(down[w]);
                }
            }
            if (v != 0)
                incoming.push_back(up[v]);
            if (incoming.empty())
                return baseTime[v]; // n == 1: lone task as root
            // Two smallest / two largest entries, positions kept apart so one
            // branch can be excluded without losing a duplicated extreme.
            long long low1 = LLONG_MAX, low2 = LLONG_MAX;
            long long high1 = LLONG_MIN, high2 = LLONG_MIN;
            int lowSlot = -1;
            int highSlot = -1;
            for (int i = 0; i < (int)incoming.size(); ++i) {
                long long value = incoming[i];
                if (value < low1) {
                    low2 = low1;
                    low1 = value;
                    lowSlot = i;
                } else if (value < low2) {
                    low2 = value;
                }
                if (value > high1) {
                    high2 = high1;
                    high1 = value;
                    highSlot = i;
                } else if (value > high2) {
                    high2 = value;
                }
            }
            best = min(best, high1 + (high1 - low1) + baseTime[v]);
            for (auto &[child, slot] : slots) {
                long long restLow = slot == lowSlot ? low2 : low1;
                long long restHigh = slot == highSlot ? high2 : high1;
                if (incoming.size() == 1) {
                    // Without this branch the neighbour plays a leaf role.
                    up[child] = baseTime[v];
                } else {
                    up[child] = restHigh + (restHigh - restLow) + baseTime[v];
                }
            }
        }
        return best;
    }
};
