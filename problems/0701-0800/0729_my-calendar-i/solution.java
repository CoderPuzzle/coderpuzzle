import java.util.ArrayList;
import java.util.List;

class MyCalendar {

    // Accepted bookings as parallel sorted starts/ends lists: a new event can
    // only conflict with the booking before and after its insertion point.
    private final List<Integer> starts = new ArrayList<>();
    private final List<Integer> ends = new ArrayList<>();

    public MyCalendar() {}

    public boolean book(int startTime, int endTime) {
        int low = 0;
        int high = starts.size();
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (starts.get(mid) <= startTime) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        int index = low - 1; // last booking with start <= startTime
        // Half-open intervals: strict tests mean touching endpoints coexist.
        if (index >= 0 && ends.get(index) > startTime) {
            return false;
        }
        if (index + 1 < starts.size() && starts.get(index + 1) < endTime) {
            return false;
        }
        // Insert exactly at the searched position — stays sorted, no re-sort.
        starts.add(index + 1, startTime);
        ends.add(index + 1, endTime);
        return true;
    }
}
