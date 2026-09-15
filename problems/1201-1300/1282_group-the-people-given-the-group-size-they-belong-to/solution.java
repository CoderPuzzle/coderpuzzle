import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Bucket ids by required size, then slice each bucket into chunks of
// exactly that size — the input guarantees each bucket divides evenly.
class Solution {

    public List<List<Integer>> groupThePeople(int[] groupSizes) {
        Map<Integer, List<Integer>> buckets = new HashMap<>();
        for (int person = 0; person < groupSizes.length; ++person) {
            buckets.computeIfAbsent(groupSizes[person], k -> new ArrayList<>()).add(person);
        }
        List<List<Integer>> groups = new ArrayList<>();
        // A valid grouping exists, so every bucket length is a multiple of
        // its size and the slices come out even.
        for (Map.Entry<Integer, List<Integer>> entry : buckets.entrySet()) {
            int size = entry.getKey();
            List<Integer> members = entry.getValue();
            for (int start = 0; start < members.size(); start += size) {
                groups.add(new ArrayList<>(members.subList(start, start + size)));
            }
        }
        return groups;
    }
}
