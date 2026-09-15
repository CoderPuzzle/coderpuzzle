import java.util.ArrayList;
import java.util.List;

class Solution {

    public List<Integer> targetIndices(int[] nums, int target) {
        int smaller = 0;
        int equal = 0;
        for (int value : nums) {
            if (value < target) smaller++;
            else if (value == target) equal++;
        }
        List<Integer> answer = new ArrayList<>(equal);
        for (int index = smaller; index < smaller + equal; index++) answer.add(index);
        return answer;
    }
}
