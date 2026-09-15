class Solution {

    public int earliestFinishTime(int[] landStartTime, int[] landDuration, int[] waterStartTime, int[] waterDuration) {
        // Only the moment the first ride ends matters: the second ride then
        // costs max(open, finish) + duration, which never improves when the
        // hand-off gets later. So each order fixes the earliest-finishing
        // ride of the first category and scans the other category.
        int landFinish = Integer.MAX_VALUE;
        int waterFinish = Integer.MAX_VALUE;
        for (int i = 0; i < landStartTime.length; i++) {
            landFinish = Math.min(landFinish, landStartTime[i] + landDuration[i]);
        }
        for (int j = 0; j < waterStartTime.length; j++) {
            waterFinish = Math.min(waterFinish, waterStartTime[j] + waterDuration[j]);
        }
        int landFirst = Integer.MAX_VALUE;
        int waterFirst = Integer.MAX_VALUE;
        for (int j = 0; j < waterStartTime.length; j++) {
            landFirst = Math.min(landFirst, Math.max(waterStartTime[j], landFinish) + waterDuration[j]);
        }
        for (int i = 0; i < landStartTime.length; i++) {
            waterFirst = Math.min(waterFirst, Math.max(landStartTime[i], waterFinish) + landDuration[i]);
        }
        return Math.min(landFirst, waterFirst);
    }
}
