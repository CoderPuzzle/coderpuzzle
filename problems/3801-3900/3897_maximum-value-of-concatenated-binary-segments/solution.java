import java.util.Arrays;

class Solution {

    public int maxValue(int[] nums1, int[] nums0) {
        Integer[] order = new Integer[nums1.length];
        for (int i = 0; i < order.length; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (left, right) -> {
            int leftCategory = category(nums1[left], nums0[left]);
            int rightCategory = category(nums1[right], nums0[right]);
            if (leftCategory != rightCategory) return Integer.compare(leftCategory, rightCategory);
            if (leftCategory != 1) return 0;
            if (nums1[left] != nums1[right]) return Integer.compare(nums1[right], nums1[left]);
            return Integer.compare(nums0[left], nums0[right]);
        });

        long answer = 0;
        long modulus = 1_000_000_007L;
        for (int index : order) {
            for (int count = 0; count < nums1[index]; count++) answer = (answer * 2 + 1) % modulus;
            for (int count = 0; count < nums0[index]; count++) answer = (answer * 2) % modulus;
        }
        return (int) answer;
    }

    private int category(int ones, int zeros) {
        if (zeros == 0) return 0;
        if (ones == 0) return 2;
        return 1;
    }
}
