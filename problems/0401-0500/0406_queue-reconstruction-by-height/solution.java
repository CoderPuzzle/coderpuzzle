import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

class Solution {

    public int[][] reconstructQueue(int[][] people) {
        int[][] ordered = people.clone();
        Arrays.sort(ordered, (a, b) -> {
            if (a[0] != b[0]) return Integer.compare(b[0], a[0]); // taller first
            return Integer.compare(a[1], b[1]); // fewer people in front first
        });
        // With everyone already placed taller-or-equal, inserting at index k
        // puts exactly k such people in front; shorter people inserted later
        // are invisible to taller people's counts.
        List<int[]> queue = new ArrayList<>();
        for (int[] person : ordered) {
            queue.add(person[1], person);
        }
        return queue.toArray(new int[0][]);
    }
}
