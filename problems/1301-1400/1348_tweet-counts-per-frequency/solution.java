import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class TweetCounts {

    // Per-name sorted time lists; a query slices its window into chunks and
    // counts each chunk with two binary searches.
    private static final Map<String, Long> CHUNKS = Map.of("minute", 60L, "hour", 3600L, "day", 86400L);

    private final Map<String, List<Long>> times = new HashMap<>();

    public TweetCounts() {}

    public void recordTweet(String tweetName, int time) {
        List<Long> list = times.computeIfAbsent(tweetName, key -> new ArrayList<>());
        // Insert at the first position whose time exceeds `time`.
        int at = upperBound(list, (long) time);
        list.add(at, (long) time);
    }

    public int[] getTweetCountsPerFrequency(String freq, String tweetName, int startTime, int endTime) {
        long chunk = CHUNKS.get(freq);
        List<Long> list = times.getOrDefault(tweetName, List.of());
        int buckets = (int) (((long) endTime - startTime) / chunk) + 1;
        int[] out = new int[buckets];
        long lo = startTime;
        for (int i = 0; i < buckets; ++i) {
            long hi = Math.min(lo + chunk - 1, endTime);
            out[i] = upperBound(list, hi) - lowerBound(list, lo);
            lo += chunk;
        }
        return out;
    }

    /** First index whose value is at least target. */
    private int lowerBound(List<Long> list, long target) {
        int lo = 0;
        int hi = list.size();
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (list.get(mid) < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    /** First index whose value is strictly greater than target. */
    private int upperBound(List<Long> list, long target) {
        int lo = 0;
        int hi = list.size();
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (list.get(mid) <= target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
