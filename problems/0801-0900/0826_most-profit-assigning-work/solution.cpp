class Solution {
  public:
    int maxProfitAssignment(vector<int> &difficulty, vector<int> &profit, vector<int> &worker) {
        // Workers never compete: jobs are reusable, so each worker simply
        // earns the maximum profit among the jobs whose difficulty is at
        // most their ability. Sort the jobs by difficulty, carry the running
        // profit maximum, and read every worker's earning off a binary
        // search into the sorted difficulties.
        int n = (int)difficulty.size();
        vector<pair<int, int>> jobs;
        jobs.reserve(n);
        for (int i = 0; i < n; ++i) {
            jobs.emplace_back(difficulty[i], profit[i]);
        }
        sort(jobs.begin(), jobs.end());
        vector<int> hardest(n);
        vector<int> best(n);
        int top = 0;
        for (int i = 0; i < n; ++i) {
            top = max(top, jobs[i].second);
            hardest[i] = jobs[i].first;
            best[i] = top;
        }
        long long total = 0;
        for (int ability : worker) {
            int index = (int)(upper_bound(hardest.begin(), hardest.end(), ability) - hardest.begin()) - 1;
            if (index >= 0) {
                total += best[index];
            }
        }
        return (int)total;
    }
};
