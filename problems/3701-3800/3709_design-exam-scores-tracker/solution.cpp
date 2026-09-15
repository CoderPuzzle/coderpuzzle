#include <algorithm>
#include <vector>

// Append-only timeline with running prefix totals: chronological calls
// keep `times` sorted, so a query binary-searches the window
// [startTime, endTime] and subtracts two prefix totals.
class ExamTracker {
  public:
    ExamTracker() {}

    void record(int time, int score) {
        times.push_back(time);
        // Held in long long: up to 10^5 scores of 10^9 push totals near
        // 10^14, far past 32-bit range.
        long long previous = sums.empty() ? 0 : sums.back();
        sums.push_back(previous + score);
    }

    long long totalScore(int startTime, int endTime) {
        int left = std::lower_bound(times.begin(), times.end(), startTime) - times.begin();
        int right = std::upper_bound(times.begin(), times.end(), endTime) - times.begin() - 1;
        if (left > right) {
            return 0;
        }
        long long total = sums[right];
        if (left > 0) {
            total -= sums[left - 1];
        }
        return total;
    }

  private:
    std::vector<int> times;
    std::vector<long long> sums;
};
