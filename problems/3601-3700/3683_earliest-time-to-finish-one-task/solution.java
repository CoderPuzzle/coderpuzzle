class Solution {

    public int earliestTime(int[][] tasks) {
        // Tasks never interact: [s, t] finishes at s + t, so the earliest
        // completion is just the smallest such sum.
        int best = tasks[0][0] + tasks[0][1];
        for (int i = 1; i < tasks.length; i++) {
            best = Math.min(best, tasks[i][0] + tasks[i][1]);
        }
        return best;
    }
}
