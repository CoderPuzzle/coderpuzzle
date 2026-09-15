import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        // Rank in arr2 for present values; absent ones share the sentinel
        // rank arr2.length and then compare by value (ascending at the end).
        Map<Integer, Integer> rank = new HashMap<>();
        for (int i = 0; i < arr2.length; ++i) rank.put(arr2[i], i);
        int tail = arr2.length;
        // Composite key rank * 2000 + value keeps both orders in one int:
        // ranks are < 1000 and values <= 1000 < 2000, so no overlap.
        Integer[] boxed = new Integer[arr1.length];
        for (int i = 0; i < arr1.length; ++i) boxed[i] = arr1[i];
        java.util.Arrays.sort(boxed, (a, b) -> {
            int ka = key(a, rank, tail),
                kb = key(b, rank, tail);
            return Integer.compare(ka, kb);
        });
        int[] out = new int[arr1.length];
        for (int i = 0; i < arr1.length; ++i) out[i] = boxed[i];
        return out;
    }

    private int key(int value, Map<Integer, Integer> rank, int tail) {
        int r = rank.getOrDefault(value, tail);
        return r * 2000 + value;
    }
}
