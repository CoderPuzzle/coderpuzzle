import java.util.Arrays;

class Solution {

    public int[] replaceNonCoprimes(int[] nums) {
        int n = nums.length;
        int[] stack = new int[n];
        int size = 0;
        for (int num : nums) {
            long current = num;
            // keep absorbing into `current` while it shares a factor with
            // the processed value to its left
            while (size > 0) {
                long top = stack[size - 1];
                long g = gcd(top, current);
                if (g == 1) {
                    break;
                }
                size--;
                current = (top / g) * current;
            }
            stack[size++] = (int) current;
        }
        return Arrays.copyOf(stack, size);
    }

    private long gcd(long a, long b) {
        while (b != 0) {
            long t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
