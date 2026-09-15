import java.util.HashMap;
import java.util.Map;

class Solution {

    public int shareCandies(int[] candies, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int flavor : candies) {
            counts.merge(flavor, 1, Integer::sum);
        }
        int distinct = counts.size();
        for (int index = 0; index < k; index++) {
            int flavor = candies[index];
            counts.put(flavor, counts.get(flavor) - 1);
            if (counts.get(flavor) == 0) {
                distinct--;
            }
        }

        int answer = distinct;
        for (int right = k; right < candies.length; right++) {
            int restored = candies[right - k];
            if (counts.get(restored) == 0) {
                distinct++;
            }
            counts.put(restored, counts.get(restored) + 1);
            int removed = candies[right];
            counts.put(removed, counts.get(removed) - 1);
            if (counts.get(removed) == 0) {
                distinct--;
            }
            answer = Math.max(answer, distinct);
        }
        return answer;
    }
}
