#include <unordered_map>
#include <vector>

class Solution {
  public:
    int maxActivated(vector<vector<int>> &points) {
        // Union every pair of points sharing an x or a y coordinate; the
        // activation closure of any point is its component, and a new point
        // touches at most two components, so join the two largest (or all,
        // when there is a single component).
        int n = points.size();
        vector<int> parent(n), size(n, 1);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
        auto find = [&](int x) {
            while (parent[x] != x) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        };
        auto unite = [&](int a, int b) {
            int ra = find(a), rb = find(b);
            if (ra == rb) {
                return;
            }
            if (size[ra] < size[rb]) {
                swap(ra, rb);
            }
            parent[rb] = ra;
            size[ra] += size[rb];
        };
        unordered_map<int, int> xmap, ymap;
        for (int i = 0; i < n; i++) {
            int x = points[i][0], y = points[i][1];
            if (xmap.count(x)) {
                unite(i, xmap[x]);
            } else {
                xmap[x] = i;
            }
            if (ymap.count(y)) {
                unite(i, ymap[y]);
            } else {
                ymap[y] = i;
            }
        }
        unordered_map<int, int> comp;
        for (int i = 0; i < n; i++) {
            comp[find(i)]++;
        }
        int first = 0, second = 0;
        for (auto &entry : comp) {
            int value = entry.second;
            if (value > first) {
                second = first;
                first = value;
            } else if (value > second) {
                second = value;
            }
        }
        if (comp.size() == 1) {
            return n + 1;
        }
        return first + second + 1;
    }
};
