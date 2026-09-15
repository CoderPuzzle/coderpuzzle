class Solution {

    public int findChampion(int n, int[][] edges) {
        // Anyone stronger than team a must end with an edge into a — either
        // directly or through a last hop that is itself an incoming edge —
        // so "no team is stronger than a" is exactly "a has no incoming
        // edge". Count incoming edges, walk the teams in order, and accept
        // only the case where exactly one of them has no incoming edge.
        int[] incoming = new int[n];
        for (int[] edge : edges) {
            ++incoming[edge[1]];
        }
        int champion = -1;
        for (int team = 0; team < n; ++team) {
            if (incoming[team] == 0) {
                if (champion != -1) {
                    return -1;
                }
                champion = team;
            }
        }
        return champion;
    }
}
