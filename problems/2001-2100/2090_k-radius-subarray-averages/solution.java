import java.util.Arrays;

class Solution {

    public int[] getAverages(int[] nums, int k) {
        int[] averages = new int[nums.length];
        Arrays.fill(averages, -1);
        int width = 2 * k + 1;
        if (width > nums.length) {
            return averages;
        }

        long windowSum = 0;
        for (int index = 0; index < width; index++) {
            windowSum += nums[index];
        }
        averages[k] = (int) (windowSum / width);
        for (int center = k + 1; center < nums.length - k; center++) {
            windowSum += nums[center + k];
            windowSum -= nums[center - k - 1];
            averages[center] = (int) (windowSum / width);
        }
        return averages;
    }
}
