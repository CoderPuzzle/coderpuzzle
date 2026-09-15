import java.util.Arrays;

class Solution {

    public int[] getStrongest(int[] arr, int k) {
        int[] sorted = arr.clone();
        Arrays.sort(sorted);
        int m = sorted[(arr.length - 1) / 2];
        Integer[] boxed = new Integer[arr.length];
        for (int i = 0; i < arr.length; i++) {
            boxed[i] = arr[i];
        }
        Arrays.sort(boxed, (a, b) -> {
            long da = Math.abs((long) a - m);
            long db = Math.abs((long) b - m);
            if (da != db) {
                return Long.compare(db, da);
            }
            return Long.compare((long) b, (long) a);
        });
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = boxed[i];
        }
        return result;
    }
}
