class Solution {
  public:
    // In a tree, distance parity is the difference of depth parities, so
    // the nodes target to u are exactly u's own bipartition class and a
    // second-tree node v contributes its opposite class. One iterative
    // BFS per tree (a 1e5-node path would overflow the judged stack)
    // labels each node's parity and sizes both classes: answer[i] is
    // tree 1's class size at i's parity, plus tree 2's larger class —
    // the maximum opposite-class count over every connection node,
    // identical for every i.
    vector<int> maxTargetNodes(vector<vector<int>> &edges1, vector<vector<int>> &edges2) {
        vector<int> counts2 = classify(edges2);
        int best2 = max(counts2[0], counts2[1]);
        vector<int> counts1 = classify(edges1);
        int n = static_cast<int>(counts1.size()) - 2;
        vector<int> answer(n);
        for (int u = 0; u < n; u++) {
            answer[u] = (counts1[u + 2] == 0 ? counts1[0] : counts1[1]) + best2;
        }
        return answer;
    }

    // Slots 0/1 hold the two depth-parity class sizes, slots 2.. hold
    // each node's depth parity. Pointer-queue BFS — iterative, so deep
    // paths cannot overflow the stack.
    vector<int> classify(const vector<vector<int>> &edges) {
        int n = edges.size() + 1;
        vector<vector<int>> adj(n);
        for (const auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        vector<int> res(n + 2, 0);
        vector<int> parity(n, -1);
        parity[0] = 0;
        res[0] = 1;
        vector<int> queue(n);
        int head = 0;
        int tail = 1;
        while (head < tail) {
            int u = queue[head++];
            for (int w : adj[u]) {
                if (parity[w] < 0) {
                    parity[w] = parity[u] ^ 1;
                    res[parity[w]]++;
                    queue[tail++] = w;
                }
            }
        }
        copy(parity.begin(), parity.end(), res.begin() + 2);
        return res;
    }
};
