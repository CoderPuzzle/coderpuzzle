class Solution {
  public:
    double angleClock(int hour, int minutes) {
        // Hour hand: 30 degrees per hour plus 0.5 per minute; minute hand:
        // 6 per minute. The two vertical angles sum to 360, so fold.
        double hour_pos = 30 * (hour % 12) + 0.5 * minutes;
        double minute_pos = 6 * minutes;
        double diff = fabs(hour_pos - minute_pos);
        return min(diff, 360 - diff);
    }
};
