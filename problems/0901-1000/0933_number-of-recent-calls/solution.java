import java.util.ArrayDeque;
import java.util.Deque;

class RecentCounter {

    // A queue of ping times: ping(t) appends t, evicts everything older
    // than the window's left edge t - 3000 off the front — a time below
    // that edge is below every future edge too, since t only grows — and
    // returns how many times remain.
    private final Deque<Integer> times = new ArrayDeque<>();

    public RecentCounter() {}

    public int ping(int t) {
        times.addLast(t);
        while (times.peekFirst() < t - 3000) {
            // The left edge t - 3000 only moves right, so everything
            // evicted now is gone from every future window as well.
            times.pollFirst();
        }
        return times.size();
    }
}
