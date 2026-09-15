import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int minimumOperations(int[][] grid) {
        int rows = grid.length;
        int columns = grid[0].length;
        int total = rows * columns;
        List<Integer>[] adjacency = new ArrayList[total];
        List<Integer> leftVertices = new ArrayList<>();
        int[][] directions = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                if (grid[row][column] == 0 || (row + column) % 2 == 1) continue;
                int vertex = row * columns + column;
                leftVertices.add(vertex);
                adjacency[vertex] = new ArrayList<>();
                for (int[] direction : directions) {
                    int nr = row + direction[0];
                    int nc = column + direction[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && grid[nr][nc] == 1) {
                        adjacency[vertex].add(nr * columns + nc);
                    }
                }
            }
        }

        int[] pairLeft = new int[total];
        int[] pairRight = new int[total];
        int[] distance = new int[total];
        Arrays.fill(pairLeft, -1);
        Arrays.fill(pairRight, -1);
        int infinity = total + 1;
        int[] stack = new int[total];
        int[] pathEdges = new int[total];
        int matching = 0;
        while (true) {
            int shortest = layer(leftVertices, adjacency, pairLeft, pairRight, distance, infinity);
            if (shortest == infinity) break;
            int[] nextEdge = new int[total];
            for (int vertex : leftVertices) {
                if (
                    pairLeft[vertex] == -1 &&
                    augment(
                        vertex,
                        shortest,
                        adjacency,
                        pairLeft,
                        pairRight,
                        distance,
                        infinity,
                        nextEdge,
                        stack,
                        pathEdges
                    )
                ) {
                    matching++;
                }
            }
        }
        return matching;
    }

    private int layer(
        List<Integer> leftVertices,
        List<Integer>[] adjacency,
        int[] pairLeft,
        int[] pairRight,
        int[] distance,
        int infinity
    ) {
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        for (int vertex : leftVertices) {
            if (pairLeft[vertex] == -1) {
                distance[vertex] = 0;
                queue.add(vertex);
            } else distance[vertex] = infinity;
        }
        int shortest = infinity;
        while (!queue.isEmpty()) {
            int vertex = queue.remove();
            if (distance[vertex] >= shortest) continue;
            for (int neighbor : adjacency[vertex]) {
                int mate = pairRight[neighbor];
                if (mate == -1) shortest = distance[vertex] + 1;
                else if (distance[mate] == infinity) {
                    distance[mate] = distance[vertex] + 1;
                    queue.add(mate);
                }
            }
        }
        return shortest;
    }

    private boolean augment(
        int root,
        int shortest,
        List<Integer>[] adjacency,
        int[] pairLeft,
        int[] pairRight,
        int[] distance,
        int infinity,
        int[] nextEdge,
        int[] stack,
        int[] pathEdges
    ) {
        int size = 1;
        stack[0] = root;
        while (size > 0) {
            int vertex = stack[size - 1];
            if (nextEdge[vertex] == adjacency[vertex].size()) {
                distance[vertex] = infinity;
                size--;
                continue;
            }
            int neighbor = adjacency[vertex].get(nextEdge[vertex]++);
            int mate = pairRight[neighbor];
            if (mate == -1) {
                if (distance[vertex] + 1 != shortest) continue;
                pairLeft[vertex] = neighbor;
                pairRight[neighbor] = vertex;
                for (int level = size - 2; level >= 0; level--) {
                    int parent = stack[level];
                    int edge = pathEdges[level];
                    pairLeft[parent] = edge;
                    pairRight[edge] = parent;
                }
                return true;
            }
            if (distance[mate] == distance[vertex] + 1) {
                pathEdges[size - 1] = neighbor;
                stack[size++] = mate;
            }
        }
        return false;
    }
}
