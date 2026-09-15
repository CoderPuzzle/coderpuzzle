class Solution {
  public:
    vector<int> findSmallestSetOfVertices(int n, vector<vector<int>> &edges) {
        // A node with no incoming edge can only ever be reached by itself,
        // so it must be a starting vertex. Every other node has at least
        // one incoming edge and is therefore reachable from wherever that
        // edge originates, so the in-degree-zero nodes are also sufficient.
        vector<int> inDegree(n, 0);
        for (auto &edge : edges)
            inDegree[edge[1]]++;
        vector<int> result;
        for (int node = 0; node < n; node++)
            if (inDegree[node] == 0)
                result.push_back(node);
        return result;
    }
};
