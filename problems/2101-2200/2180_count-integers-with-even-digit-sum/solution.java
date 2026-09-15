class Solution {

    public int countEven(int num) {
        // num <= 1000, so checking every value's digit sum directly is
        // the whole story.
        int count = 0;
        for (int value = 1; value <= num; ++value) {
            int digitSum = 0;
            for (int rest = value; rest > 0; rest /= 10) {
                digitSum += rest % 10;
            }
            if (digitSum % 2 == 0) {
                ++count;
            }
        }
        return count;
    }
}
