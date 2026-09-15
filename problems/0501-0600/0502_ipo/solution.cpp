class Solution {
  public:
    int findMaximizedCapital(int k, int w, vector<int> &profits, vector<int> &capital) {
        int n = profits.size();
        vector<pair<long long, long long>> projects(n);
        for (int i = 0; i < n; i++)
            projects[i] = {capital[i], profits[i]};
        sort(projects.begin(), projects.end());
        // Greedy: each round finish the affordable project with the largest
        // profit — finishing only adds capital, so the affordable set never
        // shrinks and no smaller-profit pick can unlock more later.
        priority_queue<long long> affordable;
        long long current = w;
        int index = 0;
        // At most min(k, n) picks: only n distinct projects exist.
        int limit = min((long long)k, (long long)n);
        for (int iter = 0; iter < limit; iter++) {
            // Sweep every newly affordable project into the heap once; a
            // project affordable now stays affordable forever.
            while (index < n && projects[index].first <= current) {
                affordable.push(projects[index].second);
                index++;
            }
            // Heap empty: capital is too low to start anything left.
            if (affordable.empty())
                break;
            current += affordable.top();
            affordable.pop();
        }
        return (int)current;
    }
};
