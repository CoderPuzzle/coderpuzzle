class Solution {
  public:
    vector<bool> findAnswer(vector<int> &parent, string s) {
        int n = parent.size();
        vector<vector<int>> children(n);
        for (int i = 1; i < n; i++)
            children[parent[i]].push_back(i);

        // Postorder tour of the whole tree: dfs(x) appends every subtree
        // string of x before s[x], so the subtree of node i is exactly the
        // tour segment of length size[i] ending at i's own position. The
        // stack version below visits children in decreasing order, whose
        // reverse is the required postorder (children increasing, node
        // last).
        vector<int> pre;
        pre.reserve(n);
        vector<int> st = {0};
        while (!st.empty()) {
            int v = st.back();
            st.pop_back();
            pre.push_back(v);
            for (int c : children[v])
                st.push_back(c);
        }
        vector<int> post(pre.rbegin(), pre.rend());

        string tour(n, ' ');
        vector<int> pos(n, 0);
        vector<int> size(n, 1);
        for (int idx = 0; idx < n; idx++) {
            int v = post[idx];
            tour[idx] = s[v];
            pos[v] = idx;
        }
        for (int v : post) {
            if (parent[v] >= 0)
                size[parent[v]] += size[v];
        }

        // Manacher's algorithm on the tour: p[i] is the palindrome radius
        // at center i of the '#' interleaving. A substring [l, r] is a
        // palindrome iff the radius at its transformed center l + r + 1
        // covers its full length, so each node costs one comparison.
        int m = 2 * n + 1;
        string t(m, '#');
        for (int i = 0; i < n; i++)
            t[2 * i + 1] = tour[i];
        vector<int> p(m, 0);
        int center = 0, right = 0;
        for (int i = 0; i < m; i++) {
            if (i < right)
                p[i] = min(right - i, p[2 * center - i]);
            while (i - p[i] - 1 >= 0 && i + p[i] + 1 < m && t[i - p[i] - 1] == t[i + p[i] + 1])
                p[i]++;
            if (i + p[i] > right) {
                center = i;
                right = i + p[i];
            }
        }

        vector<bool> answer(n);
        for (int i = 0; i < n; i++)
            answer[i] = p[2 * pos[i] - size[i] + 2] >= size[i];
        return answer;
    }
};
