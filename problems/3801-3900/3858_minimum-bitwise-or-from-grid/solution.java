class Solution {

    public int minimumOR(int[][] grid) {
        int forbidden = 0;
        int answer = 0;

        for (int bit = 16; bit >= 0; --bit) {
            int candidate = forbidden | (1 << bit);
            boolean feasible = true;
            for (int[] row : grid) {
                boolean rowHasChoice = false;
                for (int value : row) {
                    if ((value & candidate) == 0) {
                        rowHasChoice = true;
                        break;
                    }
                }
                if (!rowHasChoice) {
                    feasible = false;
                    break;
                }
            }

            if (feasible) {
                forbidden = candidate;
            } else {
                answer |= 1 << bit;
            }
        }

        return answer;
    }
}
