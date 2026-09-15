class Solution {
  public:
    vector<vector<int>> matrixRankTransform(vector<vector<int>> &matrix) {
        int m = (int)matrix.size();
        int n = (int)matrix[0].size();
        // cells sorted by (value, r, c); idx = r * n + c encodes (r, c) order.
        vector<int> cells(m * n);
        for (int i = 0; i < m * n; i++)
            cells[i] = i;
        sort(cells.begin(), cells.end(), [&](int a, int b) {
            int va = matrix[a / n][a % n];
            int vb = matrix[b / n][b % n];
            if (va != vb)
                return va < vb;
            return a < b;
        });

        // Largest rank used so far in each row/column, from smaller values
        // (processing is in increasing value order, so those are final).
        vector<int> rowMax(m, 0);
        vector<int> colMax(n, 0);
        vector<vector<int>> ans(m, vector<int>(n, 0));

        vector<int> parent(m * n, -1);

        int i = 0;
        int count = (int)cells.size();
        while (i < count) {
            int value = matrix[cells[i] / n][cells[i] % n];
            int j = i;
            vector<int> group;
            while (j < count && matrix[cells[j] / n][cells[j] % n] == value) {
                group.push_back(cells[j]);
                j++;
            }

            // Fresh union-find per group, so components never leak across
            // different values. Equal values sharing a row or column are
            // forced to the same rank; unions chain through shared
            // rows/columns.
            for (int idx : group)
                parent[idx] = idx;
            unordered_map<int, int> byRow;
            for (int idx : group) {
                int r = idx / n;
                auto it = byRow.find(r);
                if (it != byRow.end()) {
                    uni(parent, idx, it->second);
                } else {
                    byRow[r] = idx;
                }
            }
            unordered_map<int, int> byCol;
            for (int idx : group) {
                int c = idx % n;
                auto it = byCol.find(c);
                if (it != byCol.end()) {
                    uni(parent, idx, it->second);
                } else {
                    byCol[c] = idx;
                }
            }

            // Component rank = 1 + the strictest requirement over its cells;
            // that is simultaneously the smallest legal rank for all of them.
            unordered_map<int, int> compRank;
            for (int idx : group) {
                int r = idx / n;
                int c = idx % n;
                int root = findRoot(parent, idx);
                int candidate = max(rowMax[r], colMax[c]) + 1;
                auto it = compRank.find(root);
                if (it == compRank.end() || candidate > it->second) {
                    compRank[root] = candidate;
                }
            }

            // Assign the shared rank and refresh the row/column maxima so
            // later, larger values see it.
            for (int idx : group) {
                int r = idx / n;
                int c = idx % n;
                int rank = compRank[findRoot(parent, idx)];
                ans[r][c] = rank;
                if (rank > rowMax[r])
                    rowMax[r] = rank;
                if (rank > colMax[c])
                    colMax[c] = rank;
            }

            i = j;
        }

        return ans;
    }

  private:
    int findRoot(vector<int> &parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void uni(vector<int> &parent, int a, int b) {
        int ra = findRoot(parent, a);
        int rb = findRoot(parent, b);
        if (ra != rb)
            parent[rb] = ra;
    }
};
