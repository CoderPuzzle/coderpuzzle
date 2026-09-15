class Solution {
  public:
    int minimumDeletions(string s) {
        // Cost of putting the a/b boundary right before index 0: delete
        // every 'a' (the whole string would sit in the b-region).
        int cost = 0;
        for (char c : s) {
            if (c == 'a') {
                cost++;
            }
        }
        int best = cost;
        // Slide the boundary one character right at a time. Passing an
        // 'a' removes it from the future deletion cost; passing a 'b'
        // adds it, since it now sits left of the boundary.
        for (char c : s) {
            if (c == 'a') {
                cost--;
            } else {
                cost++;
            }
            best = min(best, cost);
        }
        return best;
    }
};
