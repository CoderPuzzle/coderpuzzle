import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class AuctionSystem {

    // Per item, a lazy-deletion max-heap of (-amount, -userId, seq)
    // entries: the top is the live leader once every stale top has been
    // popped. A seq map names the newest entry per (userId, itemId) pair,
    // so addBid/updateBid just push a newer entry (the old one turns
    // stale by its seq) and removeBid drops the pair. The heap orders by
    // amount first, userId second, which is exactly the stated tie-break.
    private final Map<Integer, PriorityQueue<long[]>> heaps = new HashMap<>();
    private final Map<Long, Long> latestSeq = new HashMap<>();
    private long clock = 0;

    public AuctionSystem() {}

    public void addBid(int userId, int itemId, int bidAmount) {
        push(userId, itemId, bidAmount);
    }

    public void updateBid(int userId, int itemId, int newAmount) {
        push(userId, itemId, newAmount);
    }

    public void removeBid(int userId, int itemId) {
        latestSeq.remove(key(userId, itemId));
    }

    public int getHighestBidder(int itemId) {
        PriorityQueue<long[]> heap = heaps.get(itemId);
        while (heap != null && !heap.isEmpty()) {
            long[] top = heap.peek();
            long pair = key((int) -top[1], itemId);
            if (latestSeq.getOrDefault(pair, -1L) == top[2]) {
                return (int) -top[1];
            }
            heap.poll();
        }
        return -1;
    }

    private void push(int userId, int itemId, int amount) {
        long pair = key(userId, itemId);
        latestSeq.put(pair, ++clock);
        PriorityQueue<long[]> heap = heaps.computeIfAbsent(itemId, k ->
            new PriorityQueue<>((a, b) -> {
                if (a[0] != b[0]) return Long.compare(a[0], b[0]);
                return Long.compare(a[1], b[1]);
            })
        );
        heap.add(new long[] { -amount, -userId, clock });
    }

    private static long key(int userId, int itemId) {
        return ((long) userId << 16) | itemId;
    }
}
