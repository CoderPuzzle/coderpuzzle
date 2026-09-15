import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public List<Integer> findAllPeople(int n, int[][] meetings, int firstPerson) {
        Arrays.sort(meetings, (left, right) -> Integer.compare(left[2], right[2]));
        boolean[] knows = new boolean[n];
        knows[0] = true;
        knows[firstPerson] = true;
        int start = 0;
        while (start < meetings.length) {
            int end = start;
            Map<Integer, List<Integer>> graph = new HashMap<>();
            while (end < meetings.length && meetings[end][2] == meetings[start][2]) {
                int x = meetings[end][0];
                int y = meetings[end][1];
                graph.computeIfAbsent(x, ignored -> new ArrayList<>()).add(y);
                graph.computeIfAbsent(y, ignored -> new ArrayList<>()).add(x);
                end++;
            }

            ArrayDeque<Integer> queue = new ArrayDeque<>();
            for (int person : graph.keySet()) if (knows[person]) queue.add(person);
            while (!queue.isEmpty()) {
                int person = queue.remove();
                for (int other : graph.get(person)) {
                    if (!knows[other]) {
                        knows[other] = true;
                        queue.add(other);
                    }
                }
            }
            start = end;
        }

        List<Integer> answer = new ArrayList<>();
        for (int person = 0; person < n; person++) if (knows[person]) answer.add(person);
        return answer;
    }
}
