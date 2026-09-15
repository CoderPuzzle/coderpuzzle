class Solution {
  public:
    int minimumTime(int n, vector<vector<int>> &relations, vector<int> &time) {
        vector<vector<int>> adjacency(n + 1);
        vector<int> indegree(n + 1, 0);
        for (auto &relation : relations) {
            adjacency[relation[0]].push_back(relation[1]);
            indegree[relation[1]] += 1;
        }
        // finish[i] = earliest month at which course i completes.
        vector<int> finish(n + 1, 0);
        // Longest weighted chain on the prerequisite DAG: with unlimited
        // parallelism a course finishes at its duration plus the latest
        // prerequisite finish. Kahn's order makes every prerequisite final
        // before a course is processed.
        queue<int> q;
        for (int i = 1; i <= n; i++) {
            if (indegree[i] == 0) {
                finish[i] = time[i - 1];
                q.push(i);
            }
        }
        // Finishing everything means finishing the latest-ending chain.
        int answer = 0;
        while (!q.empty()) {
            int course = q.front();
            q.pop();
            answer = max(answer, finish[course]);
            for (int nxt : adjacency[course]) {
                // Relax with a max: the successor waits for ALL of its
                // prerequisites, not just the first to finish.
                finish[nxt] = max(finish[nxt], finish[course] + time[nxt - 1]);
                indegree[nxt] -= 1;
                if (indegree[nxt] == 0) {
                    q.push(nxt);
                }
            }
        }
        return answer;
    }
};
