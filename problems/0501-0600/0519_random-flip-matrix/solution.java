import java.util.HashMap;
import java.util.Random;

class Solution {

    private final int columns;
    private final int total;
    private int remaining;
    private final HashMap<Integer, Integer> mapping = new HashMap<>();
    private final Random random = new Random(519L);

    public Solution(int m, int n) {
        columns = n;
        total = m * n;
        remaining = total;
    }

    public int[] flip() {
        int index = random.nextInt(remaining);
        int value = mapping.getOrDefault(index, index);
        int last = remaining - 1;
        int lastValue = mapping.getOrDefault(last, last);
        mapping.remove(last);
        if (index != last) {
            mapping.put(index, lastValue);
        }
        remaining = last;
        return new int[] { value / columns, value % columns };
    }

    public void reset() {
        remaining = total;
        mapping.clear();
    }
}
