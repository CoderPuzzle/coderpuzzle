class Solution {

    public int[] findSmallestSetOfVertices(int n, int[][] edges) {
        // A node with no incoming edge can only ever be reached by itself,
        // so it must be a starting vertex. Every other node has at least
        // one incoming edge and is therefore reachable from wherever that
        // edge originates, so the in-degree-zero nodes are also sufficient.
        int[] inDegree = new int[n];
        for (int[] edge : edges) inDegree[edge[1]]++;
        int count = 0;
        for (int node = 0; node < n; node++) if (inDegree[node] == 0) count++;
        int[] result = new int[count];
        int idx = 0;
        for (int node = 0; node < n; node++) if (inDegree[node] == 0) result[idx++] = node;
        return result;
    }
}
