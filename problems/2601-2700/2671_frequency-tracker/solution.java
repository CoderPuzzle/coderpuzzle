import java.util.HashMap;
import java.util.Map;

class FrequencyTracker {

    // Two counters kept in lockstep: number -> how many copies sit in the
    // structure, and frequency -> how many numbers currently occur that
    // often. Each add/delete moves one number between adjacent frequency
    // buckets, so any hasFrequency question becomes a single lookup.
    private final Map<Integer, Integer> countOf;
    private final Map<Integer, Integer> numbersAt;

    public FrequencyTracker() {
        countOf = new HashMap<>();
        numbersAt = new HashMap<>();
    }

    public void add(int number) {
        int count = countOf.getOrDefault(number, 0);
        countOf.put(number, count + 1);
        if (count > 0) {
            numbersAt.merge(count, -1, Integer::sum);
        }
        numbersAt.merge(count + 1, 1, Integer::sum);
    }

    public void deleteOne(int number) {
        int count = countOf.getOrDefault(number, 0);
        // The structure may not contain it; delete nothing then.
        if (count == 0) return;
        countOf.put(number, count - 1);
        numbersAt.merge(count, -1, Integer::sum);
        if (count > 1) {
            numbersAt.merge(count - 1, 1, Integer::sum);
        }
    }

    public boolean hasFrequency(int frequency) {
        return numbersAt.getOrDefault(frequency, 0) > 0;
    }
}
