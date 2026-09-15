class Solution {
  public:
    string findSmallestRegion(vector<vector<string>> &regions, string region1, string region2) {
        unordered_map<string, string> parent;
        for (const auto &group : regions) {
            for (size_t i = 1; i < group.size(); ++i) {
                parent[group[i]] = group[0];
            }
        }
        // Ancestor chain of region1, itself included.
        unordered_set<string> chain;
        string node = region1;
        while (true) {
            chain.insert(node);
            auto it = parent.find(node);
            if (it == parent.end())
                break;
            node = it->second;
        }
        // First ancestor of region2 inside that chain is the LCA.
        node = region2;
        while (!chain.count(node)) {
            node = parent[node];
        }
        return node;
    }
};
