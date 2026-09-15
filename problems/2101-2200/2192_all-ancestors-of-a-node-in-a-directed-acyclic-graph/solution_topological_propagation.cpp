#include <queue>
#include <vector>

class Solution {
  public:
    std::vector<std::vector<int>> getAncestors(int n, std::vector<std::vector<int>> &edges) {
        // Kahn's order over the graph's natural direction: a node is dequeued
        // only once every incoming edge is consumed, so all of its direct
        // parents are final and its ancestor set is the union of each parent
        // plus that parent's already-computed set.
        std::vector<std::vector<int>> children(n), parents(n);
        std::vector<int> indegree(n, 0);
        for (const auto &edge : edges) {
            children[edge[0]].push_back(edge[1]);
            parents[edge[1]].push_back(edge[0]);
            indegree[edge[1]]++;
        }
        int words = (n + 63) / 64;
        // ancestors[v] is a bitset of the nodes that reach v
        std::vector<std::vector<unsigned long long>> ancestors(n, std::vector<unsigned long long>(words, 0ULL));
        std::queue<int> queue;
        for (int v = 0; v < n; ++v) {
            if (indegree[v] == 0) {
                queue.push(v);
            }
        }
        while (!queue.empty()) {
            int node = queue.front();
            queue.pop();
            for (int parent : parents[node]) {
                ancestors[node][parent >> 6] |= 1ULL << (parent & 63);
                for (int w = 0; w < words; ++w) {
                    ancestors[node][w] |= ancestors[parent][w];
                }
            }
            for (int child : children[node]) {
                if (--indegree[child] == 0) {
                    queue.push(child);
                }
            }
        }
        std::vector<std::vector<int>> answer(n);
        for (int v = 0; v < n; ++v) {
            for (int u = 0; u < n; ++u) {
                if ((ancestors[v][u >> 6] >> (u & 63)) & 1ULL) {
                    answer[v].push_back(u);
                }
            }
        }
        return answer;
    }
};
