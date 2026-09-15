import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    public int[] arrayRankTransform(int[] arr) {
        // Rank = position in the sorted distinct values, 1-based; the map is
        // then applied in input order so the output preserves positions.
        Set<Integer> distinctSet = new HashSet<>();
        for (int value : arr) {
            distinctSet.add(value);
        }
        List<Integer> distinct = new ArrayList<>(distinctSet);
        distinct.sort(null);
        Map<Integer, Integer> ranks = new HashMap<>();
        for (int index = 0; index < distinct.size(); ++index) {
            ranks.put(distinct.get(index), index + 1);
        }
        int[] out = new int[arr.length];
        for (int i = 0; i < arr.length; ++i) {
            out[i] = ranks.get(arr[i]);
        }
        return out;
    }
}
