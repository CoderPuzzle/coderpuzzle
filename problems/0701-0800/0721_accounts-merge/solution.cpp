class Solution {
  public:
    vector<vector<string>> accountsMerge(vector<vector<string>> &accounts) {
        unordered_map<string, string> parent;
        unordered_map<string, string> owner;

        function<string(const string &)> find = [&](const string &x) -> string {
            auto it = parent.find(x);
            if (it == parent.end()) {
                parent.emplace(x, x);
                return x;
            }
            if (it->second == x)
                return x;
            // Recursive find with full path compression: repoint x at its root.
            string r = find(it->second);
            it->second = r;
            return r;
        };

        for (const auto &account : accounts) {
            for (size_t i = 1; i < account.size(); i++) {
                if (parent.find(account[i]) == parent.end())
                    parent[account[i]] = account[i];
                owner[account[i]] = account[0];
            }
            // Unioning with the first email links the whole account — and,
            // transitively, any chain of accounts sharing emails.
            for (size_t i = 2; i < account.size(); i++) {
                string ra = find(account[1]);
                string rb = find(account[i]);
                if (ra != rb)
                    parent[ra] = rb;
            }
        }

        // Second pass in input order: merge order follows the earliest-appearing
        // email of each component, exactly as the judge requires.
        unordered_map<string, int> index;
        vector<vector<string>> groups;
        for (const auto &account : accounts) {
            for (size_t i = 1; i < account.size(); i++) {
                string root = find(account[i]);
                auto it = index.find(root);
                int idx;
                if (it == index.end()) {
                    idx = (int)groups.size();
                    index.emplace(root, idx);
                    // The root's owner names the component.
                    groups.push_back({owner[root]});
                } else {
                    idx = it->second;
                }
                groups[idx].push_back(account[i]);
            }
        }

        vector<vector<string>> merged;
        merged.reserve(groups.size());
        // Sort each component's emails and drop duplicates within one account.
        for (auto &g : groups) {
            sort(g.begin() + 1, g.end());
            g.erase(unique(g.begin() + 1, g.end()), g.end());
            merged.push_back(move(g));
        }
        return merged;
    }
};
