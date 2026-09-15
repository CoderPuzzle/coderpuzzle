import java.util.Arrays;

class Solution {

    public int minimumSum(int num) {
        // The sum of two numbers built from the four digits is minimized by
        // giving the two smallest digits the tens places, so sort and pair
        // smallest+largest into the two two-digit numbers.
        int[] digits = { num / 1000, (num / 100) % 10, (num / 10) % 10, num % 10 };
        Arrays.sort(digits);
        return 10 * (digits[0] + digits[1]) + digits[2] + digits[3];
    }
}
