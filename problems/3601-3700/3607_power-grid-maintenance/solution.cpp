class Solution {
  public:
    vector<int> processQueries(int c, vector<vector<int>> &connections, vector<vector<int>> &queries) {
        // Union-Find assigns every station its fixed grid; an offline
        // station stays in its grid, so connectivity never changes.
        vector<int> parent(c + 1), size(c + 1, 1);
        for (int i = 1; i <= c; ++i)
            parent[i] = i;
        auto find = [&](int x) -> int {
            while (parent[x] != x) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        };
        auto unite = [&](int a, int b) {
            int ra = find(a), rb = find(b);
            if (ra == rb)
                return;
            if (size[ra] < size[rb])
                swap(ra, rb);
            parent[rb] = ra;
            size[ra] += size[rb];
        };
        for (auto &e : connections)
            unite(e[0], e[1]);

        // Group stations by component root, each group sorted ascending.
        unordered_map<int, vector<int>> groups;
        for (int x = 1; x <= c; ++x)
            groups[find(x)].push_back(x);
        vector<vector<int>> components;
        vector<int> compOf(c + 1);
        int index = 0;
        for (auto &[root, members] : groups) {
            sort(members.begin(), members.end());
            for (int m : members)
                compOf[m] = index;
            components.push_back(members);
            ++index;
        }

        vector<bool> online(c + 1, true);
        // ptr[i] is the smallest index into components[i] that is still
        // online; stations only go offline, so it moves monotonically and
        // each advance happens at most once per station.
        vector<int> ptr(components.size(), 0);

        vector<int> answer;
        answer.reserve(queries.size());
        for (auto &q : queries) {
            int x = q[1];
            if (q[0] == 1) {
                if (online[x]) {
                    // An online station resolves the check by itself, even
                    // if a smaller station in the same grid is online.
                    answer.push_back(x);
                } else {
                    auto &members = components[compOf[x]];
                    int p = ptr[compOf[x]];
                    answer.push_back(p < (int)members.size() ? members[p] : -1);
                }
            } else if (online[x]) {
                online[x] = false;
                int ci = compOf[x];
                auto &members = components[ci];
                // Only a hit on the current minimum forces the pointer on.
                if (members[ptr[ci]] == x) {
                    int p = ptr[ci];
                    while (p < (int)members.size() && !online[members[p]])
                        ++p;
                    ptr[ci] = p;
                }
            }
        }
        return answer;
    }
};
