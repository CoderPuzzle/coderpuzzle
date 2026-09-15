class Solution {
  public:
    vector<bool> areConnected(int n, int threshold, vector<vector<int>> &queries) {
        vector<int> parent(n + 1);
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
        }

        for (int z = threshold + 1; z <= n; z++) {
            if (z > 1 && find(parent, z) != z) {
                continue;
            }
            for (int multiple = 2 * z; multiple <= n; multiple += z) {
                unionSet(parent, z, multiple);
            }
        }

        vector<bool> result;
        result.reserve(queries.size());
        for (auto &q : queries) {
            result.push_back(find(parent, q[0]) == find(parent, q[1]));
        }
        return result;
    }

  private:
    int find(vector<int> &parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void unionSet(vector<int> &parent, int a, int b) {
        int ra = find(parent, a);
        int rb = find(parent, b);
        if (ra != rb) {
            parent[ra] = rb;
        }
    }
};
