class Solution {

    public int findPoisonedDuration(int[] timeSeries, int duration) {
        // Every attack opens a poison window of `duration` seconds, but a
        // fresh attack inside the still-open window resets the timer, so
        // attack i keeps only the part of its window that runs out before the
        // next attack: min(duration, gap). The final attack is never followed
        // by another, so it always contributes its full duration.
        long total = 0;
        for (int i = 1; i < timeSeries.length; i++) {
            total += Math.min(duration, timeSeries[i] - timeSeries[i - 1]);
        }
        // The running total is the union of the windows so far, which never
        // exceeds t_max + duration <= 2*10^7 — well inside int range — but
        // the accumulation stays in long: it costs nothing and keeps the
        // code independent of that bound argument.
        return (int) (total + duration);
    }
}
