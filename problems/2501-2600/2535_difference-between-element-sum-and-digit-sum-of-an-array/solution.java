class Solution {

    public int differenceOfSum(int[] nums) {
        // One pass accumulates both sums at once; every element is at
        // least its own digit sum (equality only for single digits), and
        // the bounds (2000 elements of at most 2000) keep both totals
        // far inside int, so a single Math.abs closes the case.
        int elementSum = 0;
        int digitSum = 0;
        for (int value : nums) {
            elementSum += value;
            while (value > 0) {
                digitSum += value % 10;
                value /= 10;
            }
        }
        return Math.abs(elementSum - digitSum);
    }
}
