import java.util.Arrays;

class Solution {

    public int[] sortByBits(int[] arr) {
        // Popcount (<= 14) shifted above the value (< 2^16): one comparable
        // integer per element carries both key fields.
        return Arrays.stream(arr)
            .boxed()
            .sorted((a, b) -> {
                int pa = Integer.bitCount(a);
                int pb = Integer.bitCount(b);
                return pa != pb ? Integer.compare(pa, pb) : Integer.compare(a, b);
            })
            .mapToInt(Integer::intValue)
            .toArray();
    }
}
