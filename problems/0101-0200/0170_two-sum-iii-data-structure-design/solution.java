import java.util.HashMap;
import java.util.Map;

class TwoSum {

    // Hash multiset: value -> occurrence count. add bumps a counter in O(1);
    // find lazily scans the distinct values once, asking for each complement.
    private final Map<Integer, Integer> counts = new HashMap<>();

    public TwoSum() {}

    public void add(int number) {
        counts.merge(number, 1, Integer::sum);
    }

    public boolean find(int value) {
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            int complement = value - entry.getKey();
            // A value that is its own complement needs two stored copies.
            if (counts.containsKey(complement) && (complement != entry.getKey() || entry.getValue() > 1)) return true;
        }
        return false;
    }
}
