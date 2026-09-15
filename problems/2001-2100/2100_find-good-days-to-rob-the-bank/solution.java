import java.util.ArrayList;
import java.util.List;

class Solution {

    public List<Integer> goodDaysToRobBank(int[] security, int time) {
        int n = security.length;
        int[] before = new int[n];
        int[] after = new int[n];
        for (int day = 1; day < n; day++) {
            if (security[day - 1] >= security[day]) before[day] = before[day - 1] + 1;
        }
        for (int day = n - 2; day >= 0; day--) {
            if (security[day] <= security[day + 1]) after[day] = after[day + 1] + 1;
        }
        List<Integer> answer = new ArrayList<>();
        for (int day = 0; day < n; day++) {
            if (before[day] >= time && after[day] >= time) answer.add(day);
        }
        return answer;
    }
}
