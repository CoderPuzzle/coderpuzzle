class Solution {

    public long minInitialStrength(int[] monsters, int[][] boosts) {
        int n = monsters.length;
        long[] delta = new long[n + 1];
        for (int[] boost : boosts) {
            delta[boost[0]] += boost[2];
            delta[boost[1] + 1] -= boost[2];
        }

        long bonus = 0;
        long prefix = 0;
        long answer = 0;
        for (int i = 0; i < n; ++i) {
            bonus += delta[i];
            long needed = monsters[i] - bonus;
            if (needed > 0) {
                answer = Math.max(answer, prefix + needed);
            }
            prefix += monsters[i];
        }
        return answer;
    }
}
