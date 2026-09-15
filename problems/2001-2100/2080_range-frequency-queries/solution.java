import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class RangeFreqQuery {

    private final Map<Integer, List<Integer>> positions = new HashMap<>();

    public RangeFreqQuery(int[] arr) {
        for (int index = 0; index < arr.length; index++) {
            positions.computeIfAbsent(arr[index], ignored -> new ArrayList<>()).add(index);
        }
    }

    public int query(int left, int right, int value) {
        List<Integer> indices = positions.get(value);
        if (indices == null) return 0;
        return lowerBound(indices, right + 1) - lowerBound(indices, left);
    }

    private int lowerBound(List<Integer> indices, int target) {
        int low = 0;
        int high = indices.size();
        while (low < high) {
            int middle = low + (high - low) / 2;
            if (indices.get(middle) < target) low = middle + 1;
            else high = middle;
        }
        return low;
    }
}
