import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] readBinaryWatch(int turnedOn) {
        // Hours outer, minutes inner: the walk emits the pinned chronological
        // order directly, with no post-sort.
        List<String> found = new ArrayList<>();
        for (int hour = 0; hour < 12; hour++) {
            for (int minute = 0; minute < 60; minute++) {
                // A time shows when its lit hour LEDs plus lit minute LEDs
                // equal turnedOn; each lit count is just a popcount.
                if (Integer.bitCount(hour) + Integer.bitCount(minute) == turnedOn) {
                    // "%d:%02d": no hour leading zero, always two minute digits.
                    found.add(String.format("%d:%02d", hour, minute));
                }
            }
        }
        return found.toArray(new String[0]);
    }
}
