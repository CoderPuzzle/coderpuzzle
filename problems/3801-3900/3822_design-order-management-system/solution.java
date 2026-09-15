import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class OrderManagementSystem {

    // Two maps in lockstep: orders maps orderId -> its packed (type, price)
    // key so modify/cancel find the attributes in one lookup, and buckets
    // maps the packed key -> the ids at that key, so a query reads exactly
    // its bucket. The key packs the type bit above 30 price bits (price
    // <= 10^9 < 2^30). Queries return sorted ids — the statement frees
    // the order.
    private static final long TYPE_BIT = 1L << 30;

    private final Map<Integer, Long> orders = new HashMap<>();
    private final Map<Long, HashSet<Integer>> buckets = new HashMap<>();

    public OrderManagementSystem() {}

    public void addOrder(int orderId, String orderType, int price) {
        long key = key(orderType, price);
        orders.put(orderId, key);
        buckets.computeIfAbsent(key, k -> new HashSet<>()).add(orderId);
    }

    public void modifyOrder(int orderId, int newPrice) {
        long oldKey = orders.get(orderId);
        buckets.get(oldKey).remove(orderId);
        long newKey = (oldKey & TYPE_BIT) | newPrice;
        orders.put(orderId, newKey);
        buckets.computeIfAbsent(newKey, k -> new HashSet<>()).add(orderId);
    }

    public void cancelOrder(int orderId) {
        buckets.get(orders.remove(orderId)).remove(orderId);
    }

    public int[] getOrdersAtPrice(String orderType, int price) {
        Set<Integer> ids = buckets.get(key(orderType, price));
        if (ids == null) {
            return new int[0];
        }
        int[] out = new int[ids.size()];
        int index = 0;
        for (int id : ids) {
            out[index++] = id;
        }
        Arrays.sort(out);
        return out;
    }

    private static long key(String orderType, int price) {
        return ("sell".equals(orderType) ? TYPE_BIT : 0) | price;
    }
}
