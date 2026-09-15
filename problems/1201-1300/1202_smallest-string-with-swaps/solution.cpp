class Solution {
  public:
    string smallestStringWithSwaps(string s, vector<vector<int>> &pairs) {
        int n = (int)s.size();
        vector<int> parent(n);
        for (int i = 0; i < n; i++)
            parent[i] = i;

        // chained swaps let any two indices in one component exchange, so a
        // component's character multiset is fixed but freely permutable
        for (auto &pair : pairs) {
            int ra = find(parent, pair[0]);
            int rb = find(parent, pair[1]);
            if (ra != rb)
                parent[ra] = rb;
        }

        unordered_map<int, vector<int>> groups;
        for (int i = 0; i < n; i++) {
            groups[find(parent, i)].push_back(i);
        }

        string result = s;
        // smallest characters to the smallest indices of each component;
        // components are independent so this is globally optimal
        for (auto &entry : groups) {
            vector<int> &indices = entry.second;
            sort(indices.begin(), indices.end());
            string chars;
            chars.reserve(indices.size());
            for (int i : indices)
                chars.push_back(result[i]);
            sort(chars.begin(), chars.end());
            for (size_t i = 0; i < indices.size(); i++) {
                result[indices[i]] = chars[i];
            }
        }
        return result;
    }

  private:
    int find(vector<int> &parent, int x) {
        // path halving keeps the trees shallow
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
};
