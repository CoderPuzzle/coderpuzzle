import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] occurrencesOfElement(int[] nums, int[] queries, int x) {
        // One sweep records every index where x occurs, in order. Query k
        // then reads straight off that list: the k-th occurrence exists
        // exactly when k does not overrun it. Indices are 1-based ranks
        // into a 0-based list, hence the k - 1.
        List<Integer> positions = new ArrayList<>();
        for (int index = 0; index < nums.length; ++index) {
            if (nums[index] == x) {
                positions.add(index);
            }
        }
        int total = positions.size();
        int[] answer = new int[queries.length];
        for (int i = 0; i < queries.length; ++i) {
            int k = queries[i];
            answer[i] = k <= total ? positions.get(k - 1) : -1;
        }
        return answer;
    }
}
