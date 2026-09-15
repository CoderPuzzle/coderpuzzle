import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[][] fourSum(int[] nums, int target) {
        // Sorted copy leaves the caller's array untouched; sorting makes every
        // emitted quadruplet ascending and the i-then-j scan lexicographic.
        int[] arr = nums.clone();
        Arrays.sort(arr);
        int n = arr.length;
        List<int[]> result = new ArrayList<>();
        for (int i = 0; i + 3 < n; i++) {
            // Reusing the same value for the first slot would re-find the same
            // triples, so skip runs of equal values.
            if (i > 0 && arr[i] == arr[i - 1]) continue;
            for (int j = i + 1; j + 2 < n; j++) {
                // Same skip one level down, measured against j's own start.
                if (j > i + 1 && arr[j] == arr[j - 1]) continue;
                int left = j + 1,
                    right = n - 1;
                while (left < right) {
                    // Four values of up to 1e9 in magnitude overflow int, so
                    // the running total lives in a long.
                    long total = (long) arr[i] + arr[j] + arr[left] + arr[right];
                    // Below target the sum must grow, so left moves right;
                    // above target, right retreats.
                    if (total < target) {
                        left++;
                    } else if (total > target) {
                        right--;
                    } else {
                        result.add(new int[] { arr[i], arr[j], arr[left], arr[right] });
                        // Both advance, then run past any runs of equal values,
                        // so the same pair is never emitted twice for one (i, j).
                        left++;
                        right--;
                        while (left < right && arr[left] == arr[left - 1]) left++;
                        while (left < right && arr[right] == arr[right + 1]) right--;
                    }
                }
            }
        }
        return result.toArray(new int[0][]);
    }
}
