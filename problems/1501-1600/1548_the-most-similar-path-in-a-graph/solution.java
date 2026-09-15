import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] mostSimilar(int n, int[][] roads, String[] names, String[] targetPath) {
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i < n; ++i) adjacency.add(new ArrayList<>());
        for (int[] road : roads) {
            adjacency.get(road[0]).add(road[1]);
            adjacency.get(road[1]).add(road[0]);
        }

        int pathLength = targetPath.length;
        int[][] dp = new int[pathLength][n];
        int[][] parent = new int[pathLength][n];
        for (int city = 0; city < n; ++city) {
            dp[0][city] = names[city].equals(targetPath[0]) ? 0 : 1;
        }

        for (int i = 1; i < pathLength; ++i) {
            for (int city = 0; city < n; ++city) {
                int bestParent = -1;
                int bestCost = -1;
                for (int neighbor : adjacency.get(city)) {
                    int candidate = dp[i - 1][neighbor];
                    if (bestParent == -1 || candidate < bestCost) {
                        bestCost = candidate;
                        bestParent = neighbor;
                    }
                }
                int mismatchCost = names[city].equals(targetPath[i]) ? 0 : 1;
                dp[i][city] = bestCost + mismatchCost;
                parent[i][city] = bestParent;
            }
        }

        int endCity = 0;
        for (int city = 1; city < n; ++city) {
            if (dp[pathLength - 1][city] < dp[pathLength - 1][endCity]) endCity = city;
        }

        int[] path = new int[pathLength];
        int city = endCity;
        for (int i = pathLength - 1; i >= 0; --i) {
            path[i] = city;
            city = parent[i][city];
        }
        return path;
    }
}
