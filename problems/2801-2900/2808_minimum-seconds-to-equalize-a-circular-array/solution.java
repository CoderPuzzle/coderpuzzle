import java.util.*;

class Solution {

    public int minimumSeconds(int[] nums) {
        // Every circular gap is at most n <= 10^5 and the answer halves the
        // widest one, so all intermediates stay far inside int.
        Map<Integer, Integer> firstSeen = new HashMap<>();
        Map<Integer, Integer> lastSeen = new HashMap<>();
        Map<Integer, Integer> maxForwardGap = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int num = nums[i];
            if (firstSeen.containsKey(num)) {
                maxForwardGap.merge(num, i - lastSeen.get(num), Math::max);
            } else {
                firstSeen.put(num, i);
                maxForwardGap.put(num, 0);
            }
            lastSeen.put(num, i);
        }
        int answer = nums.length;
        for (Map.Entry<Integer, Integer> entry : firstSeen.entrySet()) {
            int gap = Math.max(
                maxForwardGap.get(entry.getKey()),
                nums.length - lastSeen.get(entry.getKey()) + entry.getValue()
            );
            answer = Math.min(answer, gap / 2);
        }
        return answer;
    }
}
