import java.util.ArrayList;
import java.util.List;

class MyCalendarTwo {

    // Two interval lists. `singles` holds every accepted booking; `doubles`
    // holds the regions where two accepted bookings already overlap. A new
    // event is scanned against `doubles` first -- meeting any of them would
    // park a third event on the same moment, so it is refused and nothing
    // is recorded. Otherwise each accepted event it overlaps contributes
    // the intersection to `doubles`, and the event itself joins `singles`.
    private final List<int[]> singles = new ArrayList<>();
    private final List<int[]> doubles = new ArrayList<>();

    public MyCalendarTwo() {}

    public boolean book(int start, int end) {
        for (int[] region : doubles) {
            if (start < region[1] && region[0] < end) {
                return false;
            }
        }
        for (int[] event : singles) {
            if (start < event[1] && event[0] < end) {
                doubles.add(new int[] { Math.max(start, event[0]), Math.min(end, event[1]) });
            }
        }
        singles.add(new int[] { start, end });
        return true;
    }
}
