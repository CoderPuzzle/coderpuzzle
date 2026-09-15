class Solution {
  public:
    vector<int> findOrder(int numCourses, vector<vector<int>> &prerequisites) {
        // A valid order is exactly a topological ordering of the graph where
        // each pair [course, prereq] is the edge prereq -> course.
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
        vector<int> order;
        order.reserve(numCourses);
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
                        return {};
                    }
                    if (color[nxt] == 0) {
                        color[nxt] = 1;
                        stack.push_back({nxt, 0});
                    }
                } else {
                    // When a frame runs out of children its node is fully
                    // explored: color it 2 and append it after every course
                    // that depends on it.
                    color[node] = 2;
                    order.push_back(node);
                    stack.pop_back();
                }
            }
        }
        // Reversing the postorder puts every prerequisite before the courses
        // that depend on it; a back edge short-circuits with an empty list.
        reverse(order.begin(), order.end());
        return order;
    }
};
