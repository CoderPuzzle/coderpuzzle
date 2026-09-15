import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class RideSharingSystem {

    // Two FIFO deques plus a waiting set: riders and drivers queue in
    // arrival order, matchDriverWithRider pairs the two fronts, and
    // cancelRider only unmarks the rider — a later match lazily skips any
    // front rider that is no longer waiting, so cancellation never shifts
    // the queue.
    private final Deque<Integer> riders = new ArrayDeque<>();
    private final Deque<Integer> drivers = new ArrayDeque<>();
    private final Set<Integer> waiting = new HashSet<>();

    public RideSharingSystem() {}

    public void addRider(int riderId) {
        riders.addLast(riderId);
        waiting.add(riderId);
    }

    public void addDriver(int driverId) {
        drivers.addLast(driverId);
    }

    public int[] matchDriverWithRider() {
        while (!riders.isEmpty() && !waiting.contains(riders.peekFirst())) {
            riders.pollFirst();
        }
        if (riders.isEmpty() || drivers.isEmpty()) {
            return new int[] { -1, -1 };
        }
        int riderId = riders.pollFirst();
        waiting.remove(riderId);
        return new int[] { drivers.pollFirst(), riderId };
    }

    public void cancelRider(int riderId) {
        waiting.remove(riderId);
    }
}
