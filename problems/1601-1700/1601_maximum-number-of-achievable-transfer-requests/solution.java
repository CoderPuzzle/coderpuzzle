class Solution {

    public int maximumRequests(int n, int[][] requests) {
        int m = requests.length;
        int best = 0;
        for (int mask = 0; mask < 1 << m; mask++) {
            int popcount = Integer.bitCount(mask);
            if (popcount <= best) {
                continue;
            }
            int[] degree = new int[n];
            for (int i = 0; i < m; i++) {
                if ((mask & (1 << i)) != 0) {
                    degree[requests[i][0]]--;
                    degree[requests[i][1]]++;
                }
            }
            boolean balanced = true;
            for (int d : degree) {
                if (d != 0) {
                    balanced = false;
                    break;
                }
            }
            if (balanced) {
                best = popcount;
            }
        }
        return best;
    }
}
