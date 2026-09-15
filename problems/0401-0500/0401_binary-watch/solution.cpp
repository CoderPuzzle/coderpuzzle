class Solution {
  public:
    vector<string> readBinaryWatch(int turnedOn) {
        // Hours outer, minutes inner: the walk emits the pinned chronological
        // order directly, with no post-sort.
        vector<string> times;
        for (int hour = 0; hour < 12; hour++) {
            for (int minute = 0; minute < 60; minute++) {
                // A time shows when its lit hour LEDs plus lit minute LEDs
                // equal turnedOn; each lit count is just a popcount.
                if (__builtin_popcount(hour) + __builtin_popcount(minute) == turnedOn) {
                    // No hour leading zero, always two minute digits.
                    string minuteDigits = minute < 10 ? "0" + to_string(minute) : to_string(minute);
                    times.push_back(to_string(hour) + ":" + minuteDigits);
                }
            }
        }
        return times;
    }
};
