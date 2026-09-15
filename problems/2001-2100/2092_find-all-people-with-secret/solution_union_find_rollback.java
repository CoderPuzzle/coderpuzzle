import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public List<Integer> findAllPeople(int n, int[][] meetings, int firstPerson) {
        int[] parent = new int[n];
        for (int person = 0; person < n; person++) parent[person] = person;
        // Moment 0: person 0 hands the whisper to firstPerson, so the two
        // share a component while everybody else is still a singleton.
        parent[0] = firstPerson;
        Arrays.sort(meetings, (left, right) -> Integer.compare(left[2], right[2]));
        int start = 0;
        while (start < meetings.length) {
            int end = start;
            while (end < meetings.length && meetings[end][2] == meetings[start][2]) {
                int ra = find(parent, meetings[end][0]);
                int rb = find(parent, meetings[end][1]);
                if (ra != rb) {
                    parent[ra] = rb;
                }
                end++;
            }

            // Roll back every attendee this moment left uninformed: their
            // merges must not leak the whisper into a later moment.
            int root = find(parent, 0);
            for (int index = start; index < end; index++) {
                int x = meetings[index][0];
                int y = meetings[index][1];
                if (find(parent, x) != root) {
                    parent[x] = x;
                }
                if (find(parent, y) != root) {
                    parent[y] = y;
                }
            }
            start = end;
        }

        int root = find(parent, 0);
        List<Integer> answer = new ArrayList<>();
        for (int person = 0; person < n; person++) if (find(parent, person) == root) answer.add(person);
        return answer;
    }

    // Path-halving: splice every other node directly under its
    // grandparent, flattening the tree while walking to the root.
    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
