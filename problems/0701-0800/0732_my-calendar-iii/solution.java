import java.util.TreeMap;

class MyCalendarThree {

    // Boundary deltas keyed by time (TreeMap = always time-ordered):
    // +1 at each start, -1 at each end.
    private final TreeMap<Integer, Integer> delta = new TreeMap<>();

    public MyCalendarThree() {}

    public int book(int startTime, int endTime) {
        delta.merge(startTime, 1, Integer::sum);
        delta.merge(endTime, -1, Integer::sum);
        int best = 0;
        int active = 0;
        // Sweep boundaries in time order; the running sum is the number of
        // events active at that moment, so its peak is the max k-booking.
        // Deltas merge per time, so half-open touches never double-count.
        for (int value : delta.values()) {
            active += value;
            best = Math.max(best, active);
        }
        return best;
    }
}
