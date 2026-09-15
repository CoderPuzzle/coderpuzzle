#include <algorithm>
#include <vector>

class Solution {
  public:
    int findMinimumTime(vector<vector<int>> &tasks) {
        // Run each task as late as its window allows: seconds committed at
        // the end of the timeline are inside more upcoming (by end time)
        // windows, so this never steals a second an earlier task needed.
        std::sort(tasks.begin(), tasks.end(), [](const vector<int> &a, const vector<int> &b) { return a[1] < b[1]; });
        vector<bool> running(2001, false);
        int total = 0;
        for (const auto &task : tasks) {
            int start = task[0], end = task[1];
            // Reuse whatever is already on inside this window...
            int need = task[2];
            for (int t = start; t <= end; ++t) {
                if (running[t])
                    --need;
            }
            // ...then book the remainder at the latest free points.
            for (int t = end; need > 0; --t) {
                if (!running[t]) {
                    running[t] = true;
                    ++total;
                    --need;
                }
            }
        }
        return total;
    }
};
