class Solution {
  public:
    vector<int> eventualSafeNodes(vector<vector<int>> &graph) {
        int n = graph.size();
        // Memoized DFS on the graph as given: ask each node directly whether
        // every walk from it terminates, and cache the verdict. The stack is
        // explicit, so a 10^4-deep chain cannot overflow recursion.
        const int UNVISITED = 0, VISITING = 1, SAFE = 2, UNSAFE = 3;
        vector<int> state(n, UNVISITED);
        // Per-node scratch for the active frame; a node sits on the stack at
        // most once, so node indexing works for the cursor and the flag.
        vector<int> nxt(n, 0);
        vector<bool> unsafeChild(n, false);
        for (int start = 0; start < n; start++) {
            if (state[start] != UNVISITED) {
                continue; // verdict already memoized by an earlier start
            }
            state[start] = VISITING;
            vector<int> stack;
            stack.push_back(start);
            while (!stack.empty()) {
                int u = stack.back();
                if (nxt[u] < (int)graph[u].size()) {
                    int v = graph[u][nxt[u]];
                    nxt[u]++;
                    if (state[v] == VISITING) {
                        // Back edge onto the current path: a cycle runs
                        // through it, so this successor is never safe.
                        unsafeChild[u] = true;
                    } else if (state[v] == UNVISITED) {
                        state[v] = VISITING;
                        stack.push_back(v);
                    } else if (state[v] == UNSAFE) {
                        // Memoized danger feeds straight back.
                        unsafeChild[u] = true;
                    }
                    // A SAFE successor clears the bar on its own.
                } else {
                    stack.pop_back();
                    state[u] = unsafeChild[u] ? UNSAFE : SAFE;
                    if (unsafeChild[u] && !stack.empty()) {
                        // Danger propagates up: the node below reached it.
                        unsafeChild[stack.back()] = true;
                    }
                }
            }
        }
        // The ascending scan yields the required sorted order.
        vector<int> result;
        for (int i = 0; i < n; i++) {
            if (state[i] == SAFE) {
                result.push_back(i);
            }
        }
        return result;
    }
};
