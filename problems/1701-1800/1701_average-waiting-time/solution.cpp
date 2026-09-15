class Solution {
  public:
    // Each customer's wait is settled the moment the previous order is
    // scheduled: the chef starts at max(freeAt, arrival), finishes at
    // start + time, and the wait is finish - arrival. The arrivals are
    // sorted, so one forward sweep carrying the chef's free time replays
    // the whole day. The waits total as exact integers — the deepest
    // legal queue sums to about 5 * 10^13, past 32 bits — so the total is
    // accumulated in a long long and the single division at the end is
    // the only floating-point step.
    double averageWaitingTime(vector<vector<int>> &customers) {
        long long totalWaiting = 0;
        long long freeAt = 0;
        for (const vector<int> &customer : customers) {
            long long arrival = customer[0];
            long long start = max(freeAt, arrival);
            freeAt = start + customer[1];
            totalWaiting += freeAt - arrival;
        }
        return static_cast<double>(totalWaiting) / static_cast<double>(customers.size());
    }
};
