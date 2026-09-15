class Solution {
  public:
    vector<int> kthSmallest(vector<int> &par, vector<int> &vals, vector<vector<int>> &queries) {
        // Path XOR root -> node, then bottom-up small-to-large merging of
        // sorted distinct XOR lists: a subtree's list is its largest
        // child's list (reused) grown by the node's own value and every
        // other child's distinct values, so each element only moves into
        // lists that keep doubling. A small child (under 64 values)
        // splices element-by-element — binary search plus one contiguous
        // insert — while a large child folds in with a single two-pointer
        // pass that dedupes as it goes. Queries are grouped by node and
        // answered by indexing the final list at k - 1, or -1 past the
        // end. The tree can be a 5 * 10^4-node chain, so the DFS is an
        // explicit stack.
        int n = vals.size();
        vector<vector<int>> children(n);
        for (int node = 1; node < n; ++node)
            children[par[node]].push_back(node);
        vector<int> order; // preorder: every parent precedes its children
        order.reserve(n);
        vector<int> path(n, 0);
        vector<int> stack{0};
        while (!stack.empty()) {
            int node = stack.back();
            stack.pop_back();
            order.push_back(node);
            path[node] = vals[node] ^ (node > 0 ? path[par[node]] : 0);
            for (int child : children[node])
                stack.push_back(child);
        }
        vector<vector<pair<int, int>>> byNode(n); // node -> {k, query index}
        for (int j = 0; j < (int)queries.size(); ++j) {
            byNode[queries[j][0]].push_back({queries[j][1], j});
        }
        vector<int> answers(queries.size(), 0);
        vector<vector<int>> lists(n);
        for (int t = n - 1; t >= 0; --t) {
            int node = order[t];
            vector<int> &kids = children[node];
            int base = -1;
            for (int child : kids) {
                if (base < 0 || lists[child].size() > lists[base].size())
                    base = child;
            }
            vector<int> acc = base >= 0 ? move(lists[base]) : vector<int>(); // reuse largest
            int own = path[node];
            auto ownPos = lower_bound(acc.begin(), acc.end(), own);
            if (ownPos == acc.end() || *ownPos != own)
                acc.insert(ownPos, own);
            for (int child : kids) {
                if (child == base)
                    continue;
                vector<int> &small = lists[child];
                if ((int)small.size() >= 64) {
                    vector<int> merged; // two-pointer pass, deduping as it goes
                    merged.reserve(acc.size() + small.size());
                    size_t i = 0, j = 0;
                    while (i < acc.size() && j < small.size()) {
                        if (acc[i] < small[j])
                            merged.push_back(acc[i++]);
                        else if (small[j] < acc[i])
                            merged.push_back(small[j++]);
                        else {
                            merged.push_back(acc[i++]);
                            ++j;
                        }
                    }
                    while (i < acc.size())
                        merged.push_back(acc[i++]);
                    while (j < small.size())
                        merged.push_back(small[j++]);
                    acc = move(merged);
                } else {
                    for (int value : small) {
                        auto pos = lower_bound(acc.begin(), acc.end(), value);
                        if (pos == acc.end() || *pos != value)
                            acc.insert(pos, value);
                    }
                }
            }
            for (auto &q : byNode[node]) {
                answers[q.second] = q.first <= (int)acc.size() ? acc[q.first - 1] : -1;
            }
            lists[node] = move(acc);
        }
        return answers;
    }
};
