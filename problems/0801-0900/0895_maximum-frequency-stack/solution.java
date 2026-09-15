import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class FreqStack {

    // Frequency buckets: groups.get(f - 1) is the stack of values at
    // frequency f. The top of the highest non-empty bucket is the most
    // recent value among the most frequent ones.
    private final Map<Integer, Integer> freq = new HashMap<>();
    private final List<List<Integer>> groups = new ArrayList<>();
    private int maxfreq = 0;

    public FreqStack() {}

    public void push(int val) {
        int frequency = freq.getOrDefault(val, 0) + 1;
        freq.put(val, frequency);
        while (groups.size() < frequency) {
            groups.add(new ArrayList<>());
        }
        groups.get(frequency - 1).add(val);
        if (frequency > maxfreq) {
            maxfreq = frequency;
        }
    }

    public int pop() {
        List<Integer> top = groups.get(maxfreq - 1);
        int val = top.remove(top.size() - 1);
        freq.put(val, maxfreq - 1);
        if (top.isEmpty()) {
            maxfreq--;
        }
        return val;
    }
}
