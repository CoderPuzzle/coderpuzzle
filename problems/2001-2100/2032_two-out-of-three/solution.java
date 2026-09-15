import java.util.ArrayList;
import java.util.List;

class Solution {

    public List<Integer> twoOutOfThree(int[] nums1, int[] nums2, int[] nums3) {
        int[] masks = new int[101];
        addMembership(masks, nums1, 1);
        addMembership(masks, nums2, 2);
        addMembership(masks, nums3, 4);

        List<Integer> answer = new ArrayList<>();
        for (int value = 1; value <= 100; ++value) {
            int mask = masks[value];
            if ((mask & (mask - 1)) != 0) {
                answer.add(value);
            }
        }
        return answer;
    }

    private void addMembership(int[] masks, int[] nums, int bit) {
        for (int value : nums) {
            masks[value] |= bit;
        }
    }
}
