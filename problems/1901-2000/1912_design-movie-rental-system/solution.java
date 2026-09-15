import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

class MovieRentingSystem {

    private final Map<Long, Integer> price = new HashMap<>(); // (shop, movie) -> price
    private final Map<Integer, PriorityQueue<long[]>> unrented = new HashMap<>(); // movie -> {price, shop, token}
    private final Map<Long, Long> unrentedToken = new HashMap<>(); // (movie, shop) -> live token
    private final PriorityQueue<long[]> rented = new PriorityQueue<>((a, b) -> {
        if (a[0] != b[0]) {
            return Long.compare(a[0], b[0]);
        }
        if (a[1] != b[1]) {
            return Long.compare(a[1], b[1]);
        }
        return Long.compare(a[2], b[2]);
    });
    private final Map<Long, Long> rentedToken = new HashMap<>(); // (shop, movie) -> live token
    private long serial = 0;

    public MovieRentingSystem(int n, int[][] entries) {
        for (int[] entry : entries) {
            int shop = entry[0];
            int movie = entry[1];
            price.put(pack(shop, movie), entry[2]);
            serial++;
            unrentedToken.put(pack(movie, shop), serial);
            unrented
                .computeIfAbsent(movie, key ->
                    new PriorityQueue<>((a, b) -> {
                        if (a[0] != b[0]) {
                            return Long.compare(a[0], b[0]);
                        }
                        return Long.compare(a[1], b[1]);
                    })
                )
                .offer(new long[] { entry[2], shop, serial });
        }
    }

    private static long pack(int high, int low) {
        return high * 10_000_001L + low;
    }

    public List<Integer> search(int movie) {
        PriorityQueue<long[]> heap = unrented.get(movie);
        List<Integer> result = new ArrayList<>();
        if (heap == null) {
            return result;
        }
        List<long[]> kept = new ArrayList<>();
        while (!heap.isEmpty() && result.size() < 5) {
            long[] top = heap.poll();
            Long live = unrentedToken.get(pack(movie, (int) top[1]));
            if (live == null || live != top[2]) {
                continue; // stale entry from a rent/drop cycle
            }
            result.add((int) top[1]);
            kept.add(top);
        }
        for (long[] entry : kept) {
            heap.offer(entry);
        }
        return result;
    }

    public void rent(int shop, int movie) {
        unrentedToken.remove(pack(movie, shop));
        serial++;
        rentedToken.put(pack(shop, movie), serial);
        rented.offer(new long[] { price.get(pack(shop, movie)), shop, movie, serial });
    }

    public void drop(int shop, int movie) {
        rentedToken.remove(pack(shop, movie));
        serial++;
        unrentedToken.put(pack(movie, shop), serial);
        unrented
            .computeIfAbsent(movie, key ->
                new PriorityQueue<>((a, b) -> {
                    if (a[0] != b[0]) {
                        return Long.compare(a[0], b[0]);
                    }
                    return Long.compare(a[1], b[1]);
                })
            )
            .offer(new long[] { price.get(pack(shop, movie)), shop, serial });
    }

    public List<List<Integer>> report() {
        List<List<Integer>> result = new ArrayList<>();
        List<long[]> kept = new ArrayList<>();
        while (!rented.isEmpty() && result.size() < 5) {
            long[] top = rented.poll();
            Long live = rentedToken.get(pack((int) top[1], (int) top[2]));
            if (live == null || live != top[3]) {
                continue;
            }
            List<Integer> row = new ArrayList<>();
            row.add((int) top[1]);
            row.add((int) top[2]);
            result.add(row);
            kept.add(top);
        }
        for (long[] entry : kept) {
            rented.offer(entry);
        }
        return result;
    }
}
