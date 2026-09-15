import java.util.function.IntUnaryOperator;

class Solution {

    public int[] sortTransformedArray(int[] nums, int a, int b, int c) {
        // f(x) = ax^2 + bx + c is a parabola, so its extreme transformed
        // values sit at the two ends of the sorted nums, not in the middle.
        // When a >= 0 the curve opens upward (a == 0 leaves a monotone line,
        // where the same discipline still holds): the largest values wait at
        // the ends, so the result fills from the back, each step consuming
        // the larger of f(nums[lo]) and f(nums[hi]). When a < 0 the parabola
        // is inverted, the smallest values sit at the ends, and the fill runs
        // from the front taking the smaller. |f(x)| <= 100*100^2 + 100*100 +
        // 100 = 1,010,100, well inside the int range.
        IntUnaryOperator f = x -> (a * x + b) * x + c;
        int[] result = new int[nums.length];
        int lo = 0,
            hi = nums.length - 1;
        int index = a >= 0 ? nums.length - 1 : 0;
        while (lo <= hi) {
            int left = f.applyAsInt(nums[lo]);
            int right = f.applyAsInt(nums[hi]);
            boolean takeLeft = a >= 0 ? left >= right : left <= right;
            result[index] = takeLeft ? left : right;
            if (takeLeft) {
                ++lo;
            } else {
                --hi;
            }
            index += a >= 0 ? -1 : 1;
        }
        return result;
    }
}
