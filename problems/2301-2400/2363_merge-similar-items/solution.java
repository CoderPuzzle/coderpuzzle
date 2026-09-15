import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

class Solution {

    public List<List<Integer>> mergeSimilarItems(int[][] items1, int[][] items2) {
        // A TreeMap keyed by value accumulates weights from both lists and
        // iterates in ascending value order for free.
        Map<Integer, Integer> weights = new TreeMap<>();
        for (int[][] items : new int[][][] { items1, items2 }) {
            for (int[] item : items) {
                weights.merge(item[0], item[1], Integer::sum);
            }
        }
        List<List<Integer>> ret = new ArrayList<>(weights.size());
        for (Map.Entry<Integer, Integer> entry : weights.entrySet()) {
            ret.add(List.of(entry.getKey(), entry.getValue()));
        }
        return ret;
    }
}
