class Solution {

    public double angleClock(int hour, int minutes) {
        // Hour hand: 30 degrees per hour plus 0.5 per minute; minute hand:
        // 6 per minute. The two vertical angles sum to 360, so fold.
        double hourPos = 30 * (hour % 12) + 0.5 * minutes;
        double minutePos = 6 * minutes;
        double diff = Math.abs(hourPos - minutePos);
        return Math.min(diff, 360 - diff);
    }
}
