import java.util.Arrays;

class Solution {

    public int[] assignBikes(int[][] workers, int[][] bikes) {
        // Build one (distance, worker index, bike index) triple per pair and
        // sort ascending by distance, then worker index, then bike index —
        // exactly the tie-break the statement specifies. Walking the sorted
        // triples and assigning the first time both sides are still free
        // reproduces the statement's own greedy process.
        int n = workers.length;
        int m = bikes.length;
        int[][] triples = new int[n * m][3];
        int index = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                int distance = Math.abs(workers[i][0] - bikes[j][0]) + Math.abs(workers[i][1] - bikes[j][1]);
                triples[index][0] = distance;
                triples[index][1] = i;
                triples[index][2] = j;
                index++;
            }
        }
        Arrays.sort(triples, (a, b) -> {
            if (a[0] != b[0]) return a[0] - b[0];
            if (a[1] != b[1]) return a[1] - b[1];
            return a[2] - b[2];
        });

        int[] result = new int[n];
        Arrays.fill(result, -1);
        boolean[] usedBike = new boolean[m];
        int assigned = 0;
        for (int[] triple : triples) {
            int i = triple[1];
            int j = triple[2];
            if (result[i] != -1 || usedBike[j]) continue;
            result[i] = j;
            usedBike[j] = true;
            assigned++;
            if (assigned == n) break;
        }
        return result;
    }
}
