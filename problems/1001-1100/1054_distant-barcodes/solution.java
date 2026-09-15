import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] rearrangeBarcodes(int[] barcodes) {
        int n = barcodes.length;
        Map<Integer, Integer> counts = new HashMap<>();
        for (int b : barcodes) {
            counts.merge(b, 1, Integer::sum);
        }

        List<Integer> order = new ArrayList<>(counts.keySet());
        Collections.sort(order, (a, c) -> {
            int freqA = counts.get(a);
            int freqC = counts.get(c);
            if (freqA != freqC) {
                return freqC - freqA;
            }
            return a - c;
        });

        int[] result = new int[n];
        int pos = 0;
        for (int value : order) {
            int count = counts.get(value);
            for (int i = 0; i < count; i++) {
                if (pos >= n) {
                    pos = 1;
                }
                result[pos] = value;
                pos += 2;
            }
        }

        return result;
    }
}
