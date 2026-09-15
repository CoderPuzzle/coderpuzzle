#include <vector>

class Solution {
  public:
    int deleteTreeNodes(int nodes, std::vector<int> &parent, std::vector<int> &value) {
        // Fold bottom-up: each node hands its parent its subtree sum and
        // the number of kept nodes below it — but only if its own subtree
        // sum survived as nonzero. A zero-sum subtree contributes nothing
        // to either, which is exactly the cascade: its values stop counting
        // toward every ancestor's sum too.
        std::vector<std::vector<int>> children(nodes);
        for (int i = 0; i < nodes; i++) {
            if (parent[i] >= 0) {
                children[parent[i]].push_back(i);
            }
        }
        std::vector<int> order;
        order.reserve(nodes);
        order.push_back(0);
        for (int head = 0; head < static_cast<int>(order.size()); head++) {
            for (int child : children[order[head]]) {
                order.push_back(child);
            }
        }
        std::vector<long long> subSum(value.begin(), value.end());
        std::vector<int> kept(nodes, 1);
        for (int i = nodes - 1; i >= 0; i--) {
            int node = order[i];
            int p = parent[node];
            if (p >= 0 && subSum[node] != 0) {
                subSum[p] += subSum[node];
                kept[p] += kept[node];
            }
        }
        return subSum[0] != 0 ? kept[0] : 0;
    }
};
