import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] sortJumbled(int[] mapping, int[] nums) {
        // Decorate with (mapped value, original index), sort the pairs,
        // then read the originals back in order.
        int n = nums.length;
        List<long[]> keyed = new ArrayList<>(n);
        for (int i = 0; i < n; ++i) {
            keyed.add(new long[] { mapValue(mapping, nums[i]), i });
        }
        keyed.sort((a, b) -> {
            if (a[0] != b[0]) {
                return Long.compare(a[0], b[0]);
            }
            return Long.compare(a[1], b[1]);
        });
        int[] result = new int[n];
        for (int i = 0; i < n; ++i) {
            result[i] = nums[(int) keyed.get(i)[1]];
        }
        return result;
    }

    private long mapValue(int[] mapping, int value) {
        if (value == 0) {
            return mapping[0];
        }
        long out = 0;
        long scale = 1;
        for (int rest = value; rest > 0; rest /= 10) {
            out += (long) mapping[rest % 10] * scale;
            scale *= 10;
        }
        return out;
    }
}
