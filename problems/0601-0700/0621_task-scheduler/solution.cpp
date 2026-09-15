class Solution {
  public:
    int leastInterval(vector<string> &tasks, int n) {
        unordered_map<string, int> counts;
        for (const string &t : tasks) {
            counts[t]++;
        }
        int maxFreq = 0;
        int numMax = 0;
        for (const auto &kv : counts) {
            if (kv.second > maxFreq) {
                maxFreq = kv.second;
                numMax = 1;
            } else if (kv.second == maxFreq) {
                // Letters tying the max each occupy one slot of the final partial run.
                numMax++;
            }
        }
        // The bottleneck letter frames (maxFreq - 1) cycles of n + 1 plus the
        // final run; enough distinct tasks fill every gap, so never answer
        // less than the plain task count.
        return max((int)tasks.size(), (maxFreq - 1) * (n + 1) + numMax);
    }
};
