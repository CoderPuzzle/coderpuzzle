import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public boolean canReorderDoubled(int[] arr) {
        // A pair is (x, 2x), so the value of smallest absolute value has no
        // choice: its half is smaller in magnitude and cannot be waiting for
        // it, so every copy must claim a double. Walk the distinct values in
        // ascending absolute value, carrying each value's unclaimed copies
        // forward as a demand on its double; a demand that outruns the
        // supply, or aims at a value the array never held, makes the
        // pairing impossible. Zero is its own double, so its count must be
        // even.
        Map<Integer, Integer> count = new HashMap<>();
        for (int value : arr) {
            count.merge(value, 1, Integer::sum);
        }
        List<Integer> values = new ArrayList<>(count.keySet());
        values.sort((a, b) -> Integer.compare(Math.abs(a), Math.abs(b)));
        Map<Integer, Integer> need = new HashMap<>();
        for (int value : values) {
            if (value == 0) {
                if (count.get(0) % 2 != 0) {
                    return false;
                }
                continue;
            }
            int demanded = need.getOrDefault(value, 0);
            if (demanded > count.get(value)) {
                return false;
            }
            int extra = count.get(value) - demanded;
            if (extra > 0 && !count.containsKey(2 * value)) {
                return false;
            }
            need.merge(2 * value, extra, Integer::sum);
        }
        return true;
    }
}
