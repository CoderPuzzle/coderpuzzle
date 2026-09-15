class Solution {

    public int minCostSetTime(int startAt, int moveCost, int pushCost, int targetSeconds) {
        // Only minutes in [0, 99] whose implied seconds target - 60*minutes
        // also land in [0, 99] are settable at all; cost each survivor by
        // walking its digit sequence after normalization trims the zeroes
        // the microwave would otherwise prepend.
        int best = Integer.MAX_VALUE;
        for (int minutes = 0; minutes <= 99; minutes++) {
            int seconds = targetSeconds - 60 * minutes;
            if (seconds < 0 || seconds > 99) continue;
            int[] digits = { minutes / 10, minutes % 10, seconds / 10, seconds % 10 };
            int start = 0;
            while (start < 4 && digits[start] == 0) start++;
            int cost = 0;
            int finger = startAt;
            for (int index = start; index < 4; index++) {
                if (digits[index] != finger) {
                    cost += moveCost;
                    finger = digits[index];
                }
                cost += pushCost;
            }
            best = Math.min(best, cost);
        }
        return best;
    }
}
