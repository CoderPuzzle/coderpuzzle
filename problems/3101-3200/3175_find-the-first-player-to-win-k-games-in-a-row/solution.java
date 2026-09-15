class Solution {

    public int findWinningPlayer(int[] skills, int k) {
        // Challengers arrive in index order exactly as in the queue, so one
        // king-of-the-hill pass reproduces every game until someone hits k
        // wins. If no one does by then the champion holds the global top
        // skill and can never lose again.
        int idx = 0;
        int wins = 0;
        for (int i = 1; i < skills.length; i++) {
            if (skills[i] > skills[idx]) {
                idx = i;
                wins = 1;
            } else {
                wins++;
            }
            if (wins == k) {
                return idx;
            }
        }
        return idx;
    }
}
