class Solution {
  public:
    int leastInterval(vector<string> &tasks, int n) {
        unordered_map<string, int> counts;
        for (const string &t : tasks) {
            counts[t]++;
        }
        // Max-heap of remaining counts for labels free to run right now; only
        // the counts matter, because the cooldown rule treats every label
        // alike.
        priority_queue<int> ready;
        for (const auto &kv : counts) {
            ready.push(kv.second);
        }
        // FIFO of runs still cooling: free slot and remaining count. Free
        // slots arrive in order, so the front pops.
        queue<pair<int, int>> cooling;
        int time = 0;
        while (!ready.empty() || !cooling.empty()) {
            // Release everything whose cooldown has expired by now.
            while (!cooling.empty() && cooling.front().first <= time) {
                ready.push(cooling.front().second);
                cooling.pop();
            }
            if (ready.empty()) {
                // Nothing can run: jump the clock straight to the next
                // release instead of counting idle slots one by one.
                time = cooling.front().first;
                continue;
            }
            // Run one job of the largest remaining count.
            int top = ready.top();
            ready.pop();
            if (top > 1) {
                cooling.push({time + n + 1, top - 1});
            }
            time++;
        }
        return time;
    }
};
