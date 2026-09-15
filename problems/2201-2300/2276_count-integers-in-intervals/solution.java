import java.util.Map;
import java.util.TreeMap;

class CountIntervals {

    private final TreeMap<Integer, Integer> intervals = new TreeMap<>(); // start -> end
    private long covered = 0;

    public CountIntervals() {}

    public void add(int left, int right) {
        int newLeft = left;
        int newRight = right;
        Map.Entry<Integer, Integer> entry = intervals.floorEntry(right);
        while (entry != null && entry.getValue() >= newLeft) {
            covered -= entry.getValue() - entry.getKey() + 1L;
            newLeft = Math.min(newLeft, entry.getKey());
            newRight = Math.max(newRight, entry.getValue());
            intervals.remove(entry.getKey());
            entry = intervals.floorEntry(right);
        }
        covered += newRight - newLeft + 1L;
        intervals.put(newLeft, newRight);
    }

    public int count() {
        return (int) covered;
    }
}
