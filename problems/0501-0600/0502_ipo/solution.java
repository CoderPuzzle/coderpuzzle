import java.util.*;

class Solution {

    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        int n = profits.length;
        int[][] projects = new int[n][2];
        for (int i = 0; i < n; i++) {
            projects[i][0] = capital[i];
            projects[i][1] = profits[i];
        }
        Arrays.sort(projects, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
        // Greedy: each round finish the affordable project with the largest
        // profit — finishing only adds capital, so the affordable set never
        // shrinks and no smaller-profit pick can unlock more later.
        PriorityQueue<Integer> affordable = new PriorityQueue<>(Collections.reverseOrder());
        long current = w;
        int index = 0;
        // At most min(k, n) picks: only n distinct projects exist.
        int limit = Math.min(k, n);
        for (int iter = 0; iter < limit; iter++) {
            // Sweep every newly affordable project into the heap once; a
            // project affordable now stays affordable forever.
            while (index < n && projects[index][0] <= current) {
                affordable.add(projects[index][1]);
                index++;
            }
            // Heap empty: capital is too low to start anything left.
            if (affordable.isEmpty()) break;
            current += affordable.poll();
        }
        return (int) current;
    }
}
