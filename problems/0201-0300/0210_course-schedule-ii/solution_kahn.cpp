class Solution {
  public:
    vector<int> findOrder(int numCourses, vector<vector<int>> &prerequisites) {
        // A valid order is exactly a topological ordering of the graph where
        // each pair [course, prereq] is the edge prereq -> course.
        vector<vector<int>> adjacency(numCourses);
        vector<int> indegree(numCourses, 0);
        for (const auto &pair : prerequisites) {
            int course = pair[0];
            int prereq = pair[1];
            adjacency[prereq].push_back(course);
            indegree[course] += 1;
        }
        // Kahn's algorithm: start from every course with no prerequisites.
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                q.push(i);
            }
        }
        vector<int> order;
        order.reserve(numCourses);
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            order.push_back(node);
            // Emitting a course consumes its edges: dependents lose one
            // prerequisite, and any that reaches zero becomes available.
            for (int nxt : adjacency[node]) {
                if (--indegree[nxt] == 0) {
                    q.push(nxt);
                }
            }
        }
        // A shortfall means a cycle kept positive indegrees forever; the
        // problem requires an empty list rather than a partial order.
        if ((int)order.size() == numCourses) {
            return order;
        }
        return {};
    }
};
