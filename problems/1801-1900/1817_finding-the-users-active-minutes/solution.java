import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public int[] findingUsersActiveMinutes(int[][] logs, int k) {
        // A user's UAM is the size of the set of minutes they acted in, so one
        // pass grouping logs into per-user minute sets is all the counting
        // needed; each user then lands in exactly one answer bucket.
        Map<Integer, Set<Integer>> minutesByUser = new HashMap<>();
        for (int[] log : logs) {
            minutesByUser.computeIfAbsent(log[0], ignored -> new HashSet<>()).add(log[1]);
        }
        int[] answer = new int[k];
        for (Set<Integer> minutes : minutesByUser.values()) {
            // k covers every user's UAM by the constraints; the guard only
            // keeps a malformed k from writing out of range.
            if (minutes.size() <= k) {
                answer[minutes.size() - 1]++;
            }
        }
        return answer;
    }
}
