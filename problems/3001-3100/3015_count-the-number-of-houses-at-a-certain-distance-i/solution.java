import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[] countOfPairs(int n, int x, int y) {
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int house = 0; house <= n; house++) {
            adjacency.add(new ArrayList<>());
        }
        for (int house = 1; house < n; house++) {
            adjacency.get(house).add(house + 1);
            adjacency.get(house + 1).add(house);
        }
        if (x != y) {
            adjacency.get(x).add(y);
            adjacency.get(y).add(x);
        }

        int[] result = new int[n];
        for (int source = 1; source <= n; source++) {
            // Breadth-first distances from source over the chain plus the
            // extra street; every other house lands at distance >= 1.
            int[] distance = new int[n + 1];
            Arrays.fill(distance, -1);
            distance[source] = 0;
            int[] queue = new int[n + 1];
            int head = 0,
                tail = 0;
            queue[tail++] = source;
            while (head < tail) {
                int house = queue[head++];
                for (int neighbor : adjacency.get(house)) {
                    if (distance[neighbor] < 0) {
                        distance[neighbor] = distance[house] + 1;
                        queue[tail++] = neighbor;
                    }
                }
            }
            for (int target = 1; target <= n; target++) {
                // Skip the source itself: its distance-zero pair belongs
                // to no bucket.
                if (distance[target] > 0) {
                    result[distance[target] - 1]++;
                }
            }
        }
        return result;
    }
}
