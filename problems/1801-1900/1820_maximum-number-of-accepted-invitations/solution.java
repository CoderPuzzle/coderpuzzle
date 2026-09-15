class Solution {

    private int[][] grid;
    private int n;
    private int[] invitations;

    public int maximumInvitations(int[][] grid) {
        // Maximum bipartite matching: each boy in turn looks for a girl, and
        // when his only choices are taken, an augmenting path asks an earlier
        // boy to reroute — the matched count grows by one exactly when such a
        // path exists.
        this.grid = grid;
        this.n = grid[0].length;
        this.invitations = new int[n];
        java.util.Arrays.fill(invitations, -1); // girl j is invited by boy invitations[j]
        int accepted = 0;
        for (int boy = 0; boy < grid.length; boy++) {
            if (invite(boy, new boolean[n])) {
                accepted++;
            }
        }
        return accepted;
    }

    private boolean invite(int boy, boolean[] seen) {
        for (int girl = 0; girl < n; girl++) {
            if (grid[boy][girl] == 1 && !seen[girl]) {
                seen[girl] = true;
                if (invitations[girl] == -1 || invite(invitations[girl], seen)) {
                    invitations[girl] = boy;
                    return true;
                }
            }
        }
        return false;
    }
}
