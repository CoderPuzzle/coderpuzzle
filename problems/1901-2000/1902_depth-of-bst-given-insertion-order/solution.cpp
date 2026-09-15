class Solution {
  public:
    int maxDepthBST(vector<int> &order) {
        // Inverting `order` gives pos[v], and the BST built by inserting
        // in that order is exactly the min-Cartesian tree of pos[1..n]:
        // the root is the first-inserted value and every subtree spans a
        // contiguous range of values. A monotonic stack over values 1..n
        // (pos increasing bottom to top) then recovers every parent in
        // O(n) — popping for v, the last value popped re-hangs as v's
        // left child, since it is the later-inserted of the two
        // value-neighbours v lands between, while a value popped earlier
        // keeps the stack-below parent it was given when pushed. Depths
        // fill in insertion order afterwards — a parent is always
        // inserted before its children — so two flat sweeps, no
        // recursion, cope with the 10^5-deep chains the constraints
        // allow.
        int n = (int)order.size();
        vector<int> pos(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            pos[order[i]] = i;
        }
        vector<int> parent(n + 1, 0);
        vector<int> stack;
        stack.reserve(n);
        for (int v = 1; v <= n; ++v) {
            int last = 0;
            while (!stack.empty() && pos[stack.back()] > pos[v]) {
                last = stack.back();
                stack.pop_back();
            }
            if (last)
                parent[last] = v;
            if (!stack.empty())
                parent[v] = stack.back();
            stack.push_back(v);
        }
        vector<int> depth(n + 1, 0);
        int best = 0;
        for (int v : order) {
            depth[v] = parent[v] ? depth[parent[v]] + 1 : 1;
            best = max(best, depth[v]);
        }
        return best;
    }
};
