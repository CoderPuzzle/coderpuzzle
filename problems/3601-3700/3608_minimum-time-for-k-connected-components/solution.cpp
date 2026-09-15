class Solution {
  public:
    int minTime(int n, vector<vector<int>> &edges, int k) {
        vector<int> parent(n);
        for (int i = 0; i < n; i++)
            parent[i] = i;

        // Reverse Kruskal: sweep edges from longest-lived to shortest so the
        // union-find mirrors the graph with every edge of time <= t removed.
        vector<vector<int>> ordered(edges);
        sort(ordered.begin(), ordered.end(), [](const vector<int> &a, const vector<int> &b) { return a[2] > b[2]; });

        int components = n;
        int answer = 0;
        int i = 0;
        int m = (int)ordered.size();
        while (i < m) {
            int t = ordered[i][2];
            // Pre-merge state: every edge of time <= t is gone. If the count
            // already reaches k, t works; later overwrites keep the minimum.
            if (components >= k)
                answer = t;
            // Merge the whole equal-time group so a partially merged group is
            // never mistaken for a valid intermediate state.
            while (i < m && ordered[i][2] == t) {
                // A redundant edge (no-op union) does not decrement the count.
                if (uni(parent, ordered[i][0], ordered[i][1]))
                    components--;
                i++;
            }
        }
        // The full graph itself may already have >= k components: answer 0.
        if (components >= k)
            answer = 0;
        return answer;
    }

  private:
    int find(vector<int> &parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    bool uni(vector<int> &parent, int a, int b) {
        int ra = find(parent, a), rb = find(parent, b);
        if (ra == rb)
            return false;
        parent[ra] = rb;
        return true;
    }
};
