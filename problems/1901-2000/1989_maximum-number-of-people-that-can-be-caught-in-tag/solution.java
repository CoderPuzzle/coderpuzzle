import java.util.ArrayList;
import java.util.List;

class Solution {

    public int catchMaximumAmountofPeople(int[] team, int dist) {
        // Two-pointer greedy over the sorted "it" and "not it" positions:
        // each "it" catches the leftmost uncaught person within its reach.
        List<Integer> it = new ArrayList<>();
        List<Integer> notIt = new ArrayList<>();
        for (int i = 0; i < team.length; ++i) {
            if (team[i] == 1) {
                it.add(i);
            } else {
                notIt.add(i);
            }
        }
        int i = 0,
            j = 0,
            caught = 0;
        while (i < it.size() && j < notIt.size()) {
            int itPos = it.get(i);
            int notPos = notIt.get(j);
            if (notPos < itPos - dist) {
                // Too far left: every later "it" is further right, so this
                // person can never be caught; skip them.
                ++j;
            } else if (notPos > itPos + dist) {
                // Too far right for this "it": it cannot catch anyone among
                // the remaining uncaught people, so move to the next "it".
                ++i;
            } else {
                ++caught;
                ++i;
                ++j;
            }
        }
        return caught;
    }
}
