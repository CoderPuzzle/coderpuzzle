import java.util.*;

class Solution {

    public int longestEqualSubarray(int[] nums, int k) {
        Map<Integer, List<Integer>> positionsByValue = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            positionsByValue.computeIfAbsent(nums[i], x -> new ArrayList<>()).add(i);
        }
        int answer = 0;
        for (List<Integer> positions : positionsByValue.values()) {
            int left = 0;
            for (int right = 0; right < positions.size(); right++) {
                // Span length minus kept copies is the deletion cost.
                while (positions.get(right) - positions.get(left) - (right - left) > k) {
                    left++;
                }
                answer = Math.max(answer, right - left + 1);
            }
        }
        return answer;
    }
}
