import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class TimeMap {

    // Per-key parallel value/timestamp lists: set timestamps are strictly
    // increasing, so each history stays sorted by construction.
    private final Map<String, List<String>> values = new HashMap<>();
    private final Map<String, List<Integer>> stamps = new HashMap<>();

    public TimeMap() {}

    public void set(String key, String value, int timestamp) {
        values.computeIfAbsent(key, ignored -> new ArrayList<>()).add(value);
        stamps.computeIfAbsent(key, ignored -> new ArrayList<>()).add(timestamp);
    }

    public String get(String key, int timestamp) {
        List<Integer> history = stamps.get(key);
        if (history == null) {
            return "";
        }
        int low = 0;
        int high = history.size();
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (history.get(mid) <= timestamp) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        int index = low - 1; // rightmost entry with timestamp <= t
        return index < 0 ? "" : values.get(key).get(index);
    }
}
