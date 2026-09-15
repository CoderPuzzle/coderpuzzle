class Solution {
  public:
    int maximumInvitations(vector<vector<int>> &grid) {
        // Maximum bipartite matching: each boy in turn looks for a girl, and
        // when his only choices are taken, an augmenting path asks an earlier
        // boy to reroute — the matched count grows by one exactly when such a
        // path exists.
        int m = grid.size();
        int n = grid[0].size();
        vector<int> invitations(n, -1); // girl j is invited by boy invitations[j]
        int accepted = 0;
        for (int boy = 0; boy < m; ++boy) {
            vector<bool> seen(n, false);
            if (invite(grid, invitations, boy, seen)) {
                ++accepted;
            }
        }
        return accepted;
    }

  private:
    bool invite(vector<vector<int>> &grid, vector<int> &invitations, int boy, vector<bool> &seen) {
        int n = grid[0].size();
        for (int girl = 0; girl < n; ++girl) {
            if (grid[boy][girl] == 1 && !seen[girl]) {
                seen[girl] = true;
                if (invitations[girl] == -1 || invite(grid, invitations, invitations[girl], seen)) {
                    invitations[girl] = boy;
                    return true;
                }
            }
        }
        return false;
    }
};
