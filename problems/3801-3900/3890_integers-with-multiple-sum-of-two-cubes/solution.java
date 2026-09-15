import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] findGoodIntegers(int n) {
        // The largest possible base is the integer cube root of n <= 10^9,
        // which is at most 1000.
        int limit = 0;
        while ((long) (limit + 1) * (limit + 1) * (limit + 1) <= n) {
            limit++;
        }
        long[] cubes = new long[limit + 1];
        for (int i = 1; i <= limit; i++) {
            cubes[i] = (long) i * i * i;
        }
        Map<Long, Integer> counts = new HashMap<>();
        for (int a = 1; a <= limit; a++) {
            if (cubes[a] + cubes[a] > n) {
                break;
            }
            for (int b = a; b <= limit; b++) {
                long total = cubes[a] + cubes[b];
                if (total > n) {
                    break;
                }
                counts.merge(total, 1, Integer::sum);
            }
        }
        // A value is good when at least two distinct pairs form it.
        List<Integer> result = new ArrayList<>();
        for (Map.Entry<Long, Integer> entry : counts.entrySet()) {
            if (entry.getValue() >= 2) {
                result.add(entry.getKey().intValue());
            }
        }
        result.sort(null);
        int[] out = new int[result.size()];
        for (int i = 0; i < out.length; i++) {
            out[i] = result.get(i);
        }
        return out;
    }
}
