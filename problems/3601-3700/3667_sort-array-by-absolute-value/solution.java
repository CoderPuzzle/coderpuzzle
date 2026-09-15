import java.util.Arrays;

class Solution {

    public int[] sortByAbsoluteValue(int[] nums) {
        // Comparator (|a|, a): magnitude orders the array, and the signed
        // value breaks every magnitude tie so -x always lands before x.
        // Primitive arrays take no comparator, so box, sort, and copy back.
        Integer[] boxed = new Integer[nums.length];
        for (int i = 0; i < nums.length; i++) {
            boxed[i] = nums[i];
        }
        Arrays.sort(boxed, (a, b) -> {
            int aa = Math.abs(a),
                bb = Math.abs(b);
            if (aa != bb) {
                return Integer.compare(aa, bb);
            }
            return Integer.compare(a, b);
        });
        for (int i = 0; i < nums.length; i++) {
            nums[i] = boxed[i];
        }
        // The tie-break makes the ordering total on distinct outcomes, so
        // the result is unique regardless of the sort's stability.
        return nums;
    }
}
