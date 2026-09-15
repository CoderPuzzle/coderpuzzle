import java.util.HashMap;
import java.util.Map;

class Solution {

    public int countTriplets(int[] arr) {
        // per prefix value: occurrence count and sum of (index+1); seeded
        // with the empty prefix so segments starting at index 0 count too
        Map<Integer, Long> count = new HashMap<>();
        Map<Integer, Long> indexSum = new HashMap<>();
        count.put(0, 1L);
        indexSum.put(0, 0L);
        int prefix = 0;
        long answer = 0;
        for (int j = 0; j < arr.length; j++) {
            prefix ^= arr[j];
            // equal prefixes at p < j => arr[p+1..j] XORs to 0 and every
            // internal split works: sum over such p of (j - p - 1)
            // telescopes to j * count - indexSum
            Long c = count.get(prefix);
            if (c != null) {
                answer += (long) j * c - indexSum.get(prefix);
                count.put(prefix, c + 1);
                indexSum.put(prefix, indexSum.get(prefix) + j + 1);
            } else {
                count.put(prefix, 1L);
                indexSum.put(prefix, (long) j + 1);
            }
        }
        return (int) answer;
    }
}
