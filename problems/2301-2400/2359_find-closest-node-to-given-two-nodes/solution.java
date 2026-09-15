import java.util.Arrays;

class Solution {

    // One outgoing edge per node means the walk is forced; a node already
    // seen marks the cycle, so stop there. Integer.MAX_VALUE is the INF
    // marker, so no reachable distance can be confused with it.
    private int[] distances(int[] edges, int start) {
        int[] distance = new int[edges.length];
        Arrays.fill(distance, Integer.MAX_VALUE);
        int steps = 0;
        for (int current = start; current != -1 && distance[current] == Integer.MAX_VALUE; ) {
            distance[current] = steps++;
            current = edges[current];
        }
        return distance;
    }

    public int closestMeetingNode(int[] edges, int node1, int node2) {
        int[] from1 = distances(edges, node1);
        int[] from2 = distances(edges, node2);
        int bestNode = -1;
        int bestMax = -1; // only meaningful once bestNode != -1
        for (int node = 0; node < edges.length; node++) {
            // ascending: ties keep the smaller
            if (from1[node] == Integer.MAX_VALUE || from2[node] == Integer.MAX_VALUE) {
                continue;
            }
            int reachMax = Math.max(from1[node], from2[node]);
            if (bestNode == -1 || reachMax < bestMax) {
                bestNode = node;
                bestMax = reachMax;
            }
        }
        return bestNode;
    }
}
