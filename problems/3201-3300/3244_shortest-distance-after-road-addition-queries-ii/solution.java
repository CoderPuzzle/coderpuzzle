class Solution {

    public int[] shortestDistanceAfterQueries(int n, int[][] queries) {
        // nxt[i] is the next hop from city i on the maintained route. A
        // road (u, v) helps only when u is still on the route and it jumps
        // past nxt[u]; splicing it in retires each leapfrogged city.
        // Retired cities never return, so total work stays linear.
        int[] nxt = new int[n - 1];
        for (int i = 1; i < n; i++) nxt[i - 1] = i;
        int count = n - 1;
        int[] answer = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            int u = queries[i][0],
                v = queries[i][1];
            int j = nxt[u];
            if (j > 0 && j < v) {
                while (j < v) {
                    count--;
                    int t = nxt[j];
                    nxt[j] = 0;
                    j = t;
                }
                nxt[u] = v;
            }
            answer[i] = count;
        }
        return answer;
    }
}
