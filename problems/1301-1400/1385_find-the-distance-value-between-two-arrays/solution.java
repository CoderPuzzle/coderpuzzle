import java.util.Arrays;

class Solution {

    public int findTheDistanceValue(int[] arr1, int[] arr2, int d) {
        int[] sorted2 = arr2.clone();
        Arrays.sort(sorted2);
        int count = 0;
        for (int value : arr1) {
            int i = Arrays.binarySearch(sorted2, value);
            if (i < 0) i = -(i + 1);
            boolean close = false;
            if (i < sorted2.length && sorted2[i] - value <= d) close = true;
            if (i > 0 && value - sorted2[i - 1] <= d) close = true;
            if (!close) count++;
        }
        return count;
    }
}
