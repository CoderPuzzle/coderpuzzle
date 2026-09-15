import java.util.*;

class Solution {

    public boolean isPrintable(int[][] targetGrid) {
        int rows = targetGrid.length,
            cols = targetGrid[0].length;

        // Each color's bounding rectangle: the smallest axis-aligned box
        // that covers every cell holding that color in the target grid.
        // Stored as [minRow, maxRow, minCol, maxCol].
        Map<Integer, int[]> bbox = new HashMap<>();
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                int color = targetGrid[r][c];
                int[] box = bbox.get(color);
                if (box == null) {
                    bbox.put(color, new int[] { r, r, c, c });
                } else {
                    box[0] = Math.min(box[0], r);
                    box[1] = Math.max(box[1], r);
                    box[2] = Math.min(box[2], c);
                    box[3] = Math.max(box[3], c);
                }
            }
        }

        // An edge color -> other means color's bounding box shows `other`
        // somewhere inside it, so color must be stamped before `other`.
        Map<Integer, Set<Integer>> adjacency = new HashMap<>();
        for (int color : bbox.keySet()) {
            adjacency.put(color, new HashSet<>());
        }
        for (Map.Entry<Integer, int[]> entry : bbox.entrySet()) {
            int color = entry.getKey();
            int[] box = entry.getValue();
            Set<Integer> neighbors = adjacency.get(color);
            for (int r = box[0]; r <= box[1]; r++) {
                for (int c = box[2]; c <= box[3]; c++) {
                    int other = targetGrid[r][c];
                    if (other != color) neighbors.add(other);
                }
            }
        }

        // A valid stamp order exists iff this dependency graph has no cycle.
        Map<Integer, Integer> state = new HashMap<>();
        for (int color : bbox.keySet()) {
            state.put(color, 0);
        }
        for (int color : bbox.keySet()) {
            if (state.get(color) == 0 && hasCycle(color, adjacency, state)) {
                return false;
            }
        }
        return true;
    }

    private boolean hasCycle(int node, Map<Integer, Set<Integer>> adjacency, Map<Integer, Integer> state) {
        state.put(node, 1);
        for (int neighbor : adjacency.get(node)) {
            int neighborState = state.get(neighbor);
            if (neighborState == 1) return true;
            if (neighborState == 0 && hasCycle(neighbor, adjacency, state)) return true;
        }
        state.put(node, 2);
        return false;
    }
}
