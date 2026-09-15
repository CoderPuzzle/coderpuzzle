#include <unordered_map>
#include <vector>

class Solution {
  public:
    long long taskSchedulerII(vector<int> &tasks, int space) {
        // Greedily complete each task on the earliest legal day: breaks only
        // ever help by making a later same-type task legal sooner. Jump the
        // clock to last[type] + space + 1 when the next task is still
        // blocked; totals reach ~1e10, so run in 64 bits.
        std::unordered_map<int, long long> lastDay;
        long long day = 0;
        for (int task : tasks) {
            auto found = lastDay.find(task);
            if (found != lastDay.end()) {
                day = std::max(day + 1, found->second + space + 1LL);
                found->second = day;
            } else {
                ++day;
                lastDay[task] = day;
            }
        }
        return day;
    }
};
