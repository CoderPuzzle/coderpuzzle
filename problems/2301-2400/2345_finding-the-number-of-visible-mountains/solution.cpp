#include <algorithm>
#include <cstdlib>
#include <vector>

class Solution {
  public:
    int visibleMountains(vector<vector<int>> &peaks) {
        // Mountain (x, y) contains peak (a, b) exactly when |a - x| <= y - b:
        // the peak sits inside or on the slopes. Sorting by x ascending
        // (ties by y descending) puts every potential coverer no later, so
        // a monotonic stack settles everything in one pass. Duplicated
        // peaks are invisible but still hide others, so they stay on the
        // stack for their covering effect and are only excluded from the
        // final count.
        std::sort(peaks.begin(), peaks.end(), [](const vector<int> &p, const vector<int> &q) {
            if (p[0] != q[0]) {
                return p[0] < q[0];
            }
            return p[1] > q[1];
        });
        // Stack entries: <x, y, counted>.
        vector<array<int, 3>> stack;
        int i = 0;
        const int n = static_cast<int>(peaks.size());
        while (i < n) {
            // Run-length encode equal peaks to detect duplicates.
            int j = i;
            while (j < n && peaks[j][0] == peaks[i][0] && peaks[j][1] == peaks[i][1]) {
                ++j;
            }
            const bool duplicated = j - i > 1;
            const int x = peaks[i][0], y = peaks[i][1];
            while (!stack.empty() && std::abs(stack.back()[0] - x) <= y - stack.back()[1]) {
                stack.pop_back();
            }
            const bool covered = !stack.empty() && std::abs(x - stack.back()[0]) <= stack.back()[1] - y;
            if (!covered) {
                stack.push_back({x, y, duplicated ? 0 : 1});
            }
            i = j;
        }
        int visible = 0;
        for (const array<int, 3> &entry : stack) {
            visible += entry[2];
        }
        return visible;
    }
};
