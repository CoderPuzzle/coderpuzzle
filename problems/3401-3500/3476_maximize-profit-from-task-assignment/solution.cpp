class Solution {
  public:
    // Skills partition the problem: inside one skill class every worker
    // is interchangeable and can take any task of that class, so the k
    // workers of a skill simply claim its k most profitable tasks. The
    // extra worker then claims the best leftover overall.
    long long maxProfit(vector<int> &workers, vector<vector<int>> &tasks) {
        unordered_map<int, int> counts;
        for (int w : workers)
            counts[w]++;
        unordered_map<int, vector<int>> groups;
        for (auto &t : tasks)
            groups[t[0]].push_back(t[1]);
        long long total = 0;
        long long bestExtra = 0;
        for (auto &[skill, profits] : groups) {
            sort(profits.begin(), profits.end(), greater<int>());
            // Profits reach 10^9 with up to 10^5 assignments, so the
            // total accumulates in 64 bits (~10^14 at most).
            int take = min(counts.count(skill) ? counts[skill] : 0, (int)profits.size());
            for (int i = 0; i < take; ++i)
                total += profits[i];
            if (take < (int)profits.size() && profits[take] > bestExtra)
                bestExtra = profits[take];
        }
        return total + bestExtra;
    }
};
