class Solution {

    public boolean[] canEat(int[] candiesCount, int[][] queries) {
        // Prefix sums: pref[i] is the total candies in types 0 .. i-1.
        // The earliest day type t can be touched is pref[t] / cap (eat cap
        // every day); the latest is pref[t] + candiesCount[t] - 1 (eat one
        // every day). The query holds iff favoriteDay lies in that window.
        // Prefix sums reach 1e10, so they are held in 64-bit integers.
        int n = candiesCount.length;
        long[] pref = new long[n + 1];
        for (int i = 0; i < n; ++i) pref[i + 1] = pref[i] + candiesCount[i];
        boolean[] answer = new boolean[queries.length];
        for (int i = 0; i < queries.length; ++i) {
            int t = queries[i][0],
                day = queries[i][1],
                cap = queries[i][2];
            long earliest = pref[t] / cap;
            long latest = pref[t] + candiesCount[t] - 1;
            answer[i] = earliest <= day && day <= latest;
        }
        return answer;
    }
}
