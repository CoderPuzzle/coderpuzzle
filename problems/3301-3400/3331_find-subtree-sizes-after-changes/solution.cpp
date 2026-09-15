class Solution {
  public:
    vector<int> findSubtreeSizes(vector<int> &parent, string s) {
        int n = parent.size();
        vector<vector<int>> children(n);
        for (int i = 1; i < n; i++)
            children[parent[i]].push_back(i);

        // Iterative DFS from the root. last[c] is the closest ancestor of
        // the current node holding character c; entering v saves it on the
        // stack (paired with v) and the exit visit restores it, so last[]
        // always describes the current root-to-v path. The changes are
        // simultaneous and every rewiring points at an original ancestor,
        // so resolving each node against the original tree is exact.
        vector<int> last(26, -1);
        vector<int> newparent(n, -1);
        vector<int> pre;
        pre.reserve(n);
        const int enter = -2;
        vector<pair<int, int>> stack = {{0, enter}};
        while (!stack.empty()) {
            auto [v, saved] = stack.back();
            stack.pop_back();
            int c = s[v] - 'a';
            if (saved == enter) {
                pre.push_back(v);
                newparent[v] = last[c] != -1 ? last[c] : parent[v];
                stack.push_back({v, last[c]});
                last[c] = v;
                for (int ch : children[v])
                    stack.push_back({ch, enter});
            } else {
                last[c] = saved;
            }
        }

        // Each new parent precedes v in preorder, so consuming preorder in
        // reverse folds subtree sizes up the final tree in one pass.
        vector<int> size(n, 1);
        for (int i = n - 1; i >= 1; i--) {
            int v = pre[i];
            int p = newparent[v];
            if (p >= 0)
                size[p] += size[v];
        }
        return size;
    }
};
