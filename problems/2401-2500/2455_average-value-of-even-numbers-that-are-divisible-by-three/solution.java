class Solution {

    public int averageValue(int[] nums) {
        // Divisible by 2 and by 3 means divisible by 6 (hint 2). Sum the
        // multiples of 6, count them, and floor-divide; with none present
        // return 0 as the statement asks.
        int total = 0;
        int count = 0;
        for (int value : nums) {
            if (value % 6 == 0) {
                total += value;
                count++;
            }
        }
        return count == 0 ? 0 : total / count;
    }
}
