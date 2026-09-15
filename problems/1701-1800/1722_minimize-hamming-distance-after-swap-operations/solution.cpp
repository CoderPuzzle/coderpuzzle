class Solution {
  public:
    int minimumHammingDistance(vector<int> &source, vector<int> &target, vector<vector<int>> &allowedSwaps) {
        int n = source.size();
        vector<int> parent(n);
        for (int i = 0; i < n; i++)
            parent[i] = i;

        auto find = [&](int x) {
            while (parent[x] != x) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        };

        // Swaps chain into connected components where values can be
        // permuted arbitrarily, and values never leave their component.
        for (auto &swap : allowedSwaps) {
            int ra = find(swap[0]);
            int rb = find(swap[1]);
            if (ra != rb)
                parent[ra] = rb;
        }

        unordered_map<int, vector<int>> groups;
        for (int i = 0; i < n; i++)
            groups[find(i)].push_back(i);

        // Per component, match target values against the multiset of
        // source values; each unmatched target must stay different.
        int distance = 0;
        for (auto &[root, members] : groups) {
            unordered_map<int, int> have;
            for (int i : members)
                have[source[i]]++;
            for (int i : members) {
                auto it = have.find(target[i]);
                if (it != have.end() && it->second > 0) {
                    it->second--;
                } else {
                    distance++;
                }
            }
        }
        return distance;
    }
};
