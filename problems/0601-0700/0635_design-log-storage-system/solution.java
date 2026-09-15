import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class LogSystem {

    // Prefix length per granularity: "2017" for Year, one more ":XX" field
    // per step down to the full 19 characters. Logs stay in put order; the
    // same-width truncations compare lexicographically exactly like their
    // fields, because every field is zero-padded to a fixed width.
    private static final Map<String, Integer> WIDTHS = new HashMap<>();

    static {
        WIDTHS.put("Year", 4);
        WIDTHS.put("Month", 7);
        WIDTHS.put("Day", 10);
        WIDTHS.put("Hour", 13);
        WIDTHS.put("Minute", 16);
        WIDTHS.put("Second", 19);
    }

    private final List<Integer> ids = new ArrayList<>();
    private final List<String> timestamps = new ArrayList<>();

    public LogSystem() {}

    public void put(int id, String timestamp) {
        ids.add(id);
        timestamps.add(timestamp);
    }

    public int[] retrieve(String start, String end, String granularity) {
        int width = WIDTHS.get(granularity);
        String low = start.substring(0, width);
        String high = end.substring(0, width);
        List<Integer> matches = new ArrayList<>();
        for (int index = 0; index < timestamps.size(); ++index) {
            String truncated = timestamps.get(index).substring(0, width);
            if (low.compareTo(truncated) <= 0 && truncated.compareTo(high) <= 0) {
                matches.add(ids.get(index));
            }
        }
        int[] found = new int[matches.size()];
        for (int index = 0; index < matches.size(); ++index) {
            found[index] = matches.get(index);
        }
        return found;
    }
}
