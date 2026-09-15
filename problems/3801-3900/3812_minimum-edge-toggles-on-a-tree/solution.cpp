#include <string>
#include <vector>

class Solution {
  public:
    std::vector<int> minimumFlips(int n, std::vector<std::vector<int>> &edges, std::string start, std::string target) {
        std::vector<std::vector<int>> adjacency(n);
        for (int index = 0; index < static_cast<int>(edges.size()); index++) {
            int u = edges[index][0], v = edges[index][1];
            adjacency[u].push_back(v);
            adjacency[u].push_back(index);
            adjacency[v].push_back(u);
            adjacency[v].push_back(index);
        }

        // Breadth-first discovery from node 0 records each node's parent
        // and the edge leading to it; an explicit queue keeps deep trees
        // off the call stack.
        std::vector<int> parent(n, -1);
        std::vector<int> parentEdge(n, -1);
        std::vector<int> order;
        order.reserve(n);
        order.push_back(0);
        for (size_t i = 0; i < order.size(); i++) {
            int node = order[i];
            for (size_t j = 0; j < adjacency[node].size(); j += 2) {
                int neighbor = adjacency[node][j];
                int edge = adjacency[node][j + 1];
                if (neighbor != parent[node]) {
                    parent[neighbor] = node;
                    parentEdge[neighbor] = edge;
                    order.push_back(neighbor);
                }
            }
        }

        // need[node] stays 1 while the node's flip parity is unmatched.
        std::vector<char> need(n, 0);
        for (int x = 0; x < n; x++) {
            need[x] = start[x] != target[x] ? 1 : 0;
        }
        std::vector<char> take(n - 1, 0);
        for (int i = static_cast<int>(order.size()) - 1; i >= 1; i--) {
            int node = order[i];
            if (need[node]) {
                // Children are done, so the parent edge is the only
                // remaining toggle touching this node: the choice is
                // forced, and the unmatched parity moves to the parent.
                take[parentEdge[node]] = 1;
                need[parent[node]] ^= 1;
            }
        }
        // Whatever parity survives at the root cannot be fixed anywhere.
        if (need[0]) {
            return {-1};
        }
        // A final ascending scan emits the chosen indices in order.
        std::vector<int> result;
        result.reserve(n - 1);
        for (int index = 0; index < n - 1; index++) {
            if (take[index]) {
                result.push_back(index);
            }
        }
        return result;
    }
};
