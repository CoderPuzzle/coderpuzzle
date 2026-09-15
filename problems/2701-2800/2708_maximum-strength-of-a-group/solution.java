import java.util.Arrays;

class Solution {

    public long maxStrength(int[] nums) {
        // Sorting gathers the negatives at the front. Zeros never help (any
        // kept product has magnitude >= 1), and negatives only pay off in
        // even counts, so multiply every nonzero element except — when the
        // negative count is odd — nums[neg - 1], the one closest to zero.
        // If nothing survives, the best group is the largest single element.
        // Products reach 9^13 ~ 2.5e12, so multiply in 64 bits.
        Arrays.sort(nums);
        int neg = 0;
        for (int v : nums) {
            if (v < 0) ++neg;
        }
        int skip = neg % 2 == 1 ? neg - 1 : -1;
        long prod = 1;
        boolean kept = false;
        for (int i = 0; i < nums.length; ++i) {
            if (i == skip || nums[i] == 0) continue;
            prod *= nums[i];
            kept = true;
        }
        return kept ? prod : nums[nums.length - 1];
    }
}
