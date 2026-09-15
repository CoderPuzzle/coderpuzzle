class Solution {

    public int earliestFinishTime(int[] landStartTime, int[] landDuration, int[] waterStartTime, int[] waterDuration) {
        // Delaying a boarding past an opening never helps, and an earlier
        // first finish never pushes the second boarding later: the second
        // leg starts at Math.max(first finish, second opening). Price both
        // orders for every pair and keep the cheapest.
        int best = Integer.MAX_VALUE;
        for (int i = 0; i < landStartTime.length; i++) {
            for (int j = 0; j < waterStartTime.length; j++) {
                int landDone = landStartTime[i] + landDuration[i];
                int waterDone = waterStartTime[j] + waterDuration[j];
                int landFirst = Math.max(landDone, waterStartTime[j]) + waterDuration[j];
                int waterFirst = Math.max(waterDone, landStartTime[i]) + landDuration[i];
                best = Math.min(best, Math.min(landFirst, waterFirst));
            }
        }
        return best;
    }
}
