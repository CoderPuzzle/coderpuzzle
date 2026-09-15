class Solution {
  public:
    bool canFinish(int numCourses, vector<vector<int>> &prerequisites) {
        // Each pair [course, prereq] is an edge prereq -> course; all courses
        // can finish exactly when this graph is acyclic.
        vector<vector<int>> adjacency(numCourses);
        for (const auto &pair : prerequisites) {
            int course = pair[0];
            int prereq = pair[1];
            adjacency[prereq].push_back(course);
        }
        // Three-color DFS: 0 = unvisited, 1 = on the current DFS path, 2 = fully
        // explored. Meeting a neighbor colored 1 is a back edge, i.e. a cycle.
        vector<int> color(numCourses, 0);
        // The DFS runs on an explicit stack of (node, next-child-index) frames
        // so a long chain of prerequisites cannot overflow the call stack.
        for (int start = 0; start < numCourses; start++) {
            if (color[start] != 0)
                continue;
            color[start] = 1;
            vector<pair<int, int>> stack;
            stack.push_back({start, 0});
            while (!stack.empty()) {
                auto &frame = stack.back();
                int node = frame.first;
                if (frame.second < (int)adjacency[node].size()) {
                    int nxt = adjacency[node][frame.second];
                    frame.second += 1;
                    if (color[nxt] == 1) {
                        return false;
                    }
                    if (color[nxt] == 0) {
                        color[nxt] = 1;
                        stack.push_back({nxt, 0});
                    }
                } else {
                    // When a frame runs out of children its node is fully
                    // explored: color it 2 so no later sweep ever descends into
                    // it again.
                    color[node] = 2;
                    stack.pop_back();
                }
            }
        }
        return true;
    }
};
