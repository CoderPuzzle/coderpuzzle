class Solution {
  public:
    bool leadsToDestination(int n, vector<vector<int>> &edges, int source, int destination) {
        vector<vector<int>> graph(n);
        for (const auto &edge : edges) {
            graph[edge[0]].push_back(edge[1]);
        }

        // 0 = unvisited (white), 1 = on the current DFS path (gray), 2 = fully
        // verified safe (black). A node is a leaf when it has no outgoing
        // edges; a leaf is safe only if it is the destination. The
        // destination itself must also be a true leaf -- if it has outgoing
        // edges, any path through it keeps going and can only end somewhere
        // else (or loop forever), so it is unsafe the moment it is reached.
        vector<int> state(n, 0);

        // Returns a decided verdict for a leaf or for the destination
        // itself; -1 means the node needs a full DFS expansion first.
        auto leafVerdict = [&](int node) -> int {
            if (graph[node].empty()) {
                return node == destination ? 1 : 0;
            }
            if (node == destination) {
                return 0;
            }
            return -1;
        };

        int verdict = leafVerdict(source);
        if (verdict != -1) {
            return verdict == 1;
        }

        // Explicit stack of (node, next child index) frames -- an iterative
        // post-order DFS so the recursion depth never depends on graph depth.
        state[source] = 1;
        vector<pair<int, int>> stack;
        stack.push_back({source, 0});
        while (!stack.empty()) {
            auto &[node, idx] = stack.back();
            if (idx == static_cast<int>(graph[node].size())) {
                state[node] = 2;
                stack.pop_back();
                continue;
            }
            int neighbor = graph[node][idx];
            idx++;
            if (state[neighbor] == 1) {
                return false; // back edge to a node on the current path: a cycle
            }
            if (state[neighbor] == 2) {
                continue; // already proven safe on an earlier branch
            }
            verdict = leafVerdict(neighbor);
            if (verdict == 0) {
                return false;
            }
            if (verdict == 1) {
                state[neighbor] = 2;
                continue;
            }
            state[neighbor] = 1;
            stack.push_back({neighbor, 0});
        }
        return true;
    }
};
