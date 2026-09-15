class Solution {
  public:
    bool canFinish(int numCourses, vector<vector<int>> &prerequisites) {
        // Each pair [course, prereq] is an edge prereq -> course; all courses
        // can finish exactly when this graph is acyclic.
        vector<vector<int>> adjacency(numCourses);
        vector<int> indegree(numCourses, 0);
        for (const auto &pair : prerequisites) {
            int course = pair[0];
            int prereq = pair[1];
            adjacency[prereq].push_back(course);
            indegree[course] += 1;
        }
        // Kahn's algorithm: seed with every course that has no prerequisites.
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                q.push(i);
            }
        }
        int taken = 0;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            taken += 1;
            // Taking a course removes its outgoing edges.
            for (int nxt : adjacency[node]) {
                if (--indegree[nxt] == 0) {
                    q.push(nxt);
                }
            }
        }
        // Courses inside a cycle never reach indegree zero, so a shortfall
        // means a cycle trapped the remainder.
        return taken == numCourses;
    }
};
