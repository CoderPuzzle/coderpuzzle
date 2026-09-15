import java.util.Arrays;

class Solution {

    public int minOperations(int[] nums, int[] numsDivide) {
        // An element x can head nums only if it divides every value in
        // numsDivide; one common divisor divides their GCD, so reduce the
        // target once and count the sorted elements below the smallest
        // divisor of it.
        int g = 0;
        for (int value : numsDivide) {
            g = gcd(g, value);
        }
        Arrays.sort(nums);
        int deletions = 0;
        for (int value : nums) {
            if (g % value == 0) {
                return deletions;
            }
            ++deletions;
        }
        return -1;
    }

    private int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
