import java.util.*;

class Solution {

    public int[] closestRoom(int[][] rooms, int[][] queries) {
        int n = rooms.length;
        int q = queries.length;
        Integer[] roomsBySize = new Integer[n];
        for (int i = 0; i < n; i++) {
            roomsBySize[i] = i;
        }
        Arrays.sort(roomsBySize, (a, b) -> Integer.compare(rooms[b][1], rooms[a][1]));
        // Offline trick: process queries by decreasing minSize so rooms only accumulate.
        Integer[] queryOrder = new Integer[q];
        for (int j = 0; j < q; j++) {
            queryOrder[j] = j;
        }
        Arrays.sort(queryOrder, (a, b) -> Integer.compare(queries[b][1], queries[a][1]));
        TreeSet<Integer> ids = new TreeSet<>();
        int[] answers = new int[q];
        int ri = 0;
        for (int j : queryOrder) {
            int preferred = queries[j][0];
            int minSize = queries[j][1];
            // Every room with size >= minSize qualifies; once inserted it stays
            // valid for all later queries (their thresholds are only smaller).
            while (ri < n && rooms[roomsBySize[ri]][1] >= minSize) {
                ids.add(rooms[roomsBySize[ri]][0]);
                ri++;
            }
            // Closest candidates on both sides of preferred; best stays -1 when both miss.
            Integer floor = ids.floor(preferred);
            Integer ceil = ids.ceiling(preferred);
            int best = -1;
            long bestDist = Long.MAX_VALUE;
            if (floor != null) {
                best = floor;
                bestDist = (long) preferred - floor;
            }
            // Strict < keeps floor (the smaller id) when the distances tie.
            if (ceil != null && (long) ceil - preferred < bestDist) {
                best = ceil;
            }
            answers[j] = best; // write via saved index: original order kept
        }
        return answers;
    }
}
