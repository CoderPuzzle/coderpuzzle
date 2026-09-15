class Solution {

    public int[] amountPainted(int[][] paint) {
        // Canvas of "next possibly-unpainted cell" pointers: painting a cell
        // points it one past itself and find() compresses the skips, so every
        // unit of the painting is walked exactly once across all n days.
        int limit = 50001;
        int[] nxt = new int[limit + 1];
        for (int cell = 0; cell <= limit; cell++) {
            nxt[cell] = cell;
        }
        int[] worklog = new int[paint.length];
        for (int day = 0; day < paint.length; day++) {
            int area = 0;
            int cell = find(nxt, paint[day][0]);
            while (cell < paint[day][1]) {
                area++;
                nxt[cell] = cell + 1;
                cell = find(nxt, cell + 1);
            }
            worklog[day] = area;
        }
        return worklog;
    }

    private int find(int[] nxt, int cell) {
        int root = cell;
        while (nxt[root] != root) {
            root = nxt[root];
        }
        while (nxt[cell] != root) {
            // path compression
            int forward = nxt[cell];
            nxt[cell] = root;
            cell = forward;
        }
        return root;
    }
}
