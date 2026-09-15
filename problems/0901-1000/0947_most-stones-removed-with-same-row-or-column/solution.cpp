class Solution {
  public:
    vector<int> parent;
    vector<int> sz;

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void unite(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb)
            return;
        if (sz[ra] < sz[rb])
            swap(ra, rb);
        parent[rb] = ra;
        sz[ra] += sz[rb];
    }

    int removeStones(vector<vector<int>> &stones) {
        // Stones joined by shared rows and columns split the plane into
        // connected components. Inside a component of k stones any k - 1 can
        // go: peel the component down to one survivor, every removal still
        // sharing a row or column with a stone that remains. Stones of
        // different components never share a line, so the answer is n minus
        // the number of components — union-find merges each stone with the
        // first stone registered in its row and in its column, and the roots
        // count the components.
        int n = stones.size();
        parent.resize(n);
        for (int i = 0; i < n; i++)
            parent[i] = i;
        sz.assign(n, 1);

        unordered_map<int, int> firstInRow, firstInCol;
        for (int i = 0; i < n; i++) {
            int x = stones[i][0], y = stones[i][1];
            auto r = firstInRow.emplace(x, i);
            if (!r.second)
                unite(i, r.first->second);
            auto c = firstInCol.emplace(y, i);
            if (!c.second)
                unite(i, c.first->second);
        }

        int components = 0;
        for (int i = 0; i < n; i++)
            if (find(i) == i)
                components++;
        return n - components;
    }
};
