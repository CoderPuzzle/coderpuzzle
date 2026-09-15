import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int xorAfterQueries(int[] nums, int[][] queries) {
        final long mod = 1000000007L;
        int n = nums.length;
        int b = 1;
        while ((long) (b + 1) * (b + 1) <= n) {
            b++;
        }
        // Strides above the threshold visit fewer than sqrt(n) + 1 positions
        // each and are applied literally; strides at or below it share
        // residue-class buckets, each applied in one prefix-product sweep.
        Map<Integer, List<long[]>> buckets = new HashMap<>();
        for (int[] query : queries) {
            int l = query[0],
                r = query[1],
                k = query[2],
                v = query[3];
            if (k > b) {
                for (int idx = l; idx <= r; idx += k) {
                    nums[idx] = (int) ((nums[idx] * (long) v) % mod);
                }
            } else {
                int c = l % k;
                int key = k * (b + 1) + c;
                List<long[]> events = buckets.computeIfAbsent(key, x -> new ArrayList<>());
                // Coordinate events: the multiplier starts at l's coordinate
                // and stops just past the last visited coordinate.
                events.add(new long[] { l / k, v });
                events.add(new long[] { (r - c) / k + 1, power(v, mod) });
            }
        }
        for (Map.Entry<Integer, List<long[]>> entry : buckets.entrySet()) {
            int k = entry.getKey() / (b + 1),
                c = entry.getKey() % (b + 1);
            List<long[]> events = entry.getValue();
            events.sort(Comparator.comparingLong(event -> event[0]));
            int span = (n - 1 - c) / k + 1;
            long acc = 1;
            int prev = 0;
            int i = 0;
            while (i < events.size()) {
                int pos = (int) events.get(i)[0];
                if (acc != 1) {
                    for (int p = prev; p < pos; p++) {
                        int idx = c + p * k;
                        nums[idx] = (int) ((nums[idx] * acc) % mod);
                    }
                }
                long d = 1;
                while (i < events.size() && (int) events.get(i)[0] == pos) {
                    d = (d * events.get(i)[1]) % mod;
                    i++;
                }
                acc = (acc * d) % mod;
                prev = pos;
            }
            if (acc != 1) {
                for (int p = prev; p < span; p++) {
                    int idx = c + p * k;
                    nums[idx] = (int) ((nums[idx] * acc) % mod);
                }
            }
        }
        int x = 0;
        for (int value : nums) {
            x ^= value;
        }
        return x;
    }

    private long power(long base, long mod) {
        long result = 1;
        for (long exp = mod - 2; exp > 0; exp >>= 1) {
            if ((exp & 1) == 1) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
        }
        return result;
    }
}
