import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class Solution {

    // TOP is a min-heap and REST a max-heap of (count, value) snapshots
    // of the live distinct values: TOP's peek is the worst kept pair,
    // REST's peek the best dropped one. Each slide moves at most two
    // pairs between the heaps, and `total` follows every membership
    // change, so one O(n log n) pass answers every window; stale
    // snapshots are skipped on peek and popped when surfaced. A pair
    // packs into one long as count * 2e9 + value, whose numeric order is
    // exactly (count, value) order.
    private static final long PACK = 2_000_000_001L;
    private static final int TOP = 0;
    private static final int REST = 1;

    private Map<Integer, Integer> freq;
    private PriorityQueue<Long> topHeap;
    private PriorityQueue<Long> restHeap;
    private Map<Long, Integer> membership;
    private int topSize;
    private long total;

    public long[] findXSum(int[] nums, int k, int x) {
        freq = new HashMap<>();
        topHeap = new PriorityQueue<>();
        restHeap = new PriorityQueue<>(Collections.reverseOrder());
        membership = new HashMap<>();
        topSize = 0;
        total = 0;
        long[] answer = new long[nums.length - k + 1];
        for (int i = 0; i < nums.length; ++i) {
            int value = nums[i];
            int count = freq.getOrDefault(value, 0);
            if (count > 0) {
                erase(count, value, x);
            }
            freq.put(value, count + 1);
            place(count + 1, value, x);
            if (i >= k) {
                int leaving = nums[i - k];
                int old = freq.get(leaving);
                erase(old, leaving, x);
                old -= 1;
                freq.put(leaving, old);
                if (old > 0) {
                    // a count that just reached 0 leaves no pair behind
                    place(old, leaving, x);
                }
            }
            if (i >= k - 1) {
                answer[i - k + 1] = total;
            }
        }
        return answer;
    }

    private Long peekTop() {
        while (!topHeap.isEmpty()) {
            long key = topHeap.peek();
            Integer role = membership.get(key);
            if (role != null && role == TOP && freq.getOrDefault(value(key), 0) == count(key)) {
                return key;
            }
            topHeap.poll();
        }
        return null;
    }

    private Long peekRest() {
        while (!restHeap.isEmpty()) {
            long key = restHeap.peek();
            Integer role = membership.get(key);
            if (role != null && role == REST && freq.getOrDefault(value(key), 0) == count(key)) {
                return key;
            }
            restHeap.poll();
        }
        return null;
    }

    private void erase(int erasedCount, int erasedValue, int x) {
        if (membership.remove(pack(erasedCount, erasedValue)) != TOP) {
            return;
        }
        topSize--;
        total -= (long) erasedCount * erasedValue;
        // refill from the best of rest
        while (topSize < x) {
            Long best = peekRest();
            if (best == null) {
                break;
            }
            restHeap.poll();
            membership.put(best, TOP);
            topHeap.add(best);
            topSize++;
            total += (long) count(best) * value(best);
        }
    }

    private void place(int placedCount, int placedValue, int x) {
        long key = pack(placedCount, placedValue);
        if (topSize < x) {
            membership.put(key, TOP);
            topHeap.add(key);
            topSize++;
            total += (long) placedCount * placedValue;
            return;
        }
        Long worst = peekTop();
        if (worst != null && key > worst) {
            // the newcomer beats the worst kept pair: swap them
            membership.put(worst, REST);
            restHeap.add(worst);
            total -= (long) count(worst) * value(worst);
            topSize--;
            membership.put(key, TOP);
            topHeap.add(key);
            topSize++;
            total += (long) placedCount * placedValue;
        } else {
            membership.put(key, REST);
            restHeap.add(key);
        }
    }

    private static long pack(int count, int value) {
        return (long) count * PACK + value;
    }

    private static int count(long key) {
        return (int) (key / PACK);
    }

    private static int value(long key) {
        return (int) (key % PACK);
    }
}
