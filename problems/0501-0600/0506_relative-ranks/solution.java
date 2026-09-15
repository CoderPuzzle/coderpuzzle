import java.util.Arrays;

class Solution {

    public String[] findRelativeRanks(int[] score) {
        // Sorting the athletes, not the array: an index list ordered by
        // descending score carries each athlete's placement back to its
        // original slot, so the answer keeps the input's order.
        int n = score.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; ++i) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> Integer.compare(score[b], score[a]));
        String[] medals = { "Gold Medal", "Silver Medal", "Bronze Medal" };
        String[] answer = new String[n];
        for (int place = 0; place < n; ++place) {
            answer[order[place]] = place < 3 ? medals[place] : Integer.toString(place + 1);
        }
        return answer;
    }
}
