class Solution {
  public:
    int countCompleteComponents(int n, vector<vector<int>> &edges) {
        vector<int> parent(n);
        vector<int> size(n, 1);
        for (int v = 0; v < n; v++)
            parent[v] = v;
        for (auto &edge : edges) {
            int ra = find(parent, edge[0]);
            int rb = find(parent, edge[1]);
            if (ra != rb) {
                if (size[ra] < size[rb])
                    swap(ra, rb);
                parent[rb] = ra;
                size[ra] += size[rb];
            }
        }
        vector<int> edgeCount(n, 0);
        for (auto &edge : edges)
            edgeCount[find(parent, edge[0])]++;
        int complete = 0;
        for (int v = 0; v < n; v++) {
            if (find(parent, v) == v && edgeCount[v] == size[v] * (size[v] - 1) / 2)
                complete++;
        }
        return complete;
    }

  private:
    int find(vector<int> &parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
};
