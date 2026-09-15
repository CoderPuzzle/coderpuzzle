class Solution {
  public:
    vector<int> countTasks(vector<int> &tasks, vector<int> &shifts) {
        int n = (int)tasks.size();
        vector<long long> pref(n);
        long long acc = 0;
        for (int i = 0; i < n; i++) {
            acc += tasks[i];
            pref[i] = acc;
        }
        long long total = acc;
        long long done = 0;
        vector<int> out;
        out.reserve(shifts.size());
        for (int s : shifts) {
            // done is the cumulative work finished within the current pass;
            // reaching the total ends the pass and discards unused time.
            done += s;
            if (done >= total) {
                out.push_back(0);
                done = 0;
                continue;
            }
            // upper_bound counts boundary landings as complete: pref[i] <=
            // done means task i is fully finished, and the next task holds
            // all partial work.
            int c = (int)(upper_bound(pref.begin(), pref.end(), done) - pref.begin());
            out.push_back(n - c);
        }
        return out;
    }
};
