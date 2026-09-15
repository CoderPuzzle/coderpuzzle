#include <cmath>
#include <queue>
#include <vector>

class Solution {
  public:
    double minTime(int n, int k, int m, vector<int> &time, vector<double> &mul) {
        // Dijkstra over (people-at-base mask, stage, boat side). Every leg
        // has a positive duration, so the first pop of a state is optimal.
        // Base side: cross any subgroup of size <= k; the stage advances by
        // floor(cross) % m. Destination side: one of the people already
        // across rows back while anyone remains at the base.
        int full = (1 << n) - 1;
        // groups[mask] = subgroups of mask holding 1..k people.
        vector<vector<int>> groups(full + 1);
        for (int mask = 0; mask <= full; ++mask) {
            for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
                if (__builtin_popcount(sub) <= k)
                    groups[mask].push_back(sub);
            }
        }
        // mx[s] = largest time among s's members: it sets the crossing time.
        vector<int> mx(full + 1, 0);
        for (int i = 0; i < n; ++i)
            mx[1 << i] = time[i];
        for (int s = 1; s <= full; ++s) {
            int low = s & -s;
            if (s != low)
                mx[s] = max(mx[low], mx[s ^ low]);
        }
        // Heap entries {dist, packed state: mask<<4 | stage<<1 | side}.
        using Edge = pair<double, int>;
        priority_queue<Edge, vector<Edge>, greater<Edge>> heap;
        vector<double> dist((full + 1) << 4, numeric_limits<double>::max());
        dist[(full << 4) | 0] = 0.0;
        heap.push({0.0, (full << 4) | 0});
        double ans = -1.0;
        while (!heap.empty()) {
            auto [d, state] = heap.top();
            heap.pop();
            if (dist[state] < d)
                continue;
            int mask = state >> 4, j = (state >> 1) & 7, side = state & 1;
            if (side == 0) {
                for (int s : groups[mask]) {
                    double cross = mx[s] * mul[j];
                    double nd = d + cross;
                    int rest = mask ^ s;
                    if (rest == 0) {
                        // final crossing: nobody left behind, no return
                        if (ans < 0 || nd < ans)
                            ans = nd;
                    } else {
                        int nj = (j + (int)floor(cross)) % m;
                        int nstate = (rest << 4) | (nj << 1) | 1;
                        if (nd < dist[nstate]) {
                            dist[nstate] = nd;
                            heap.push({nd, nstate});
                        }
                    }
                }
            } else {
                for (int r = 0; r < n; ++r) {
                    if (mask >> r & 1)
                        continue;
                    double ret = time[r] * mul[j];
                    int nj = (j + (int)floor(ret)) % m;
                    int nstate = ((mask | 1 << r) << 4) | (nj << 1);
                    double nd = d + ret;
                    if (nd < dist[nstate]) {
                        dist[nstate] = nd;
                        heap.push({nd, nstate});
                    }
                }
            }
        }
        return ans;
    }
};
