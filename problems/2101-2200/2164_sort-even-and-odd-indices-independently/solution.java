import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int[] sortEvenOdd(int[] nums) {
        // Strides 2 and 1-from-2 split the array by index parity; sorting
        // each slice its own direction and writing back through the same
        // strides re-interleaves them without touching positions.
        List<Integer> evens = new ArrayList<>();
        List<Integer> odds = new ArrayList<>();
        for (int index = 0; index < nums.length; index++) {
            if (index % 2 == 0) {
                evens.add(nums[index]);
            } else {
                odds.add(nums[index]);
            }
        }
        Collections.sort(evens);
        Collections.sort(odds, Collections.reverseOrder());
        int[] result = nums.clone();
        for (int index = 0; index < evens.size(); index++) {
            result[2 * index] = evens.get(index);
        }
        for (int index = 0; index < odds.size(); index++) {
            result[2 * index + 1] = odds.get(index);
        }
        return result;
    }
}
