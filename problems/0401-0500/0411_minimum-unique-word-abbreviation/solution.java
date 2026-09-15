import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    private String target;
    private int m;
    private int bestLen;
    private String bestAbbr;

    public String minAbbreviation(String target, String[] dictionary) {
        // One integer per same-length word: bit i is set where the word's
        // letter differs from target's. An abbreviation keeping exactly the
        // positions in K collides with that word precisely when K & diff == 0,
        // so a valid K must hit every diff mask. Words of other lengths can
        // never match an abbreviation of target and are skipped outright.
        this.target = target;
        this.m = target.length();
        Set<Integer> diffs = new HashSet<>();
        for (String word : dictionary) {
            if (word.length() != m) continue;
            int mask = 0;
            for (int i = 0; i < m; ++i) {
                if (word.charAt(i) != target.charAt(i)) mask |= 1 << i;
            }
            if (mask != 0) diffs.add(mask);
        }
        // Only minimal masks matter: a superset of another mask is hit by
        // anything that hits its subset, so it adds no constraint.
        List<Integer> byWeight = new ArrayList<>(diffs);
        byWeight.sort((a, b) -> Integer.bitCount(a) - Integer.bitCount(b));
        List<Integer> minimal = new ArrayList<>();
        for (int mask : byWeight) {
            boolean redundant = false;
            for (int kept : minimal) {
                if ((kept & ~mask) == 0) {
                    redundant = true;
                    break;
                }
            }
            if (!redundant) minimal.add(mask);
        }

        bestLen = m;
        bestAbbr = target; // The bare word itself is always a valid answer.
        walk(0, 0, 0, 0, false, minimal);
        return bestAbbr;
    }

    private void walk(int pos, int mask, int kept, int runs, boolean openRun, List<Integer> pending) {
        // Cost floor: letters kept, runs closed, the run still open, and the
        // one extra letter a still-unhit word will eventually force.
        int floor = kept + runs + (openRun ? 1 : 0) + (pending.isEmpty() ? 0 : 1);
        if (floor > bestLen) return;
        if (pos == m) {
            if (pending.isEmpty()) {
                int cost = kept + runs + (openRun ? 1 : 0);
                String abbr = build(mask);
                if (cost < bestLen || (cost == bestLen && abbr.compareTo(bestAbbr) < 0)) {
                    bestLen = cost;
                    bestAbbr = abbr;
                }
            }
            return;
        }
        // Abbreviate this position: a pending mask with no set bit here or
        // later can never be hit again, so the branch survives only if every
        // mask still has a bit left to aim at.
        int future = ((1 << m) - 1) ^ ((1 << pos) - 1);
        boolean alive = true;
        for (int diff : pending) {
            if ((diff & future) == 0) {
                alive = false;
                break;
            }
        }
        if (alive) walk(pos + 1, mask, kept, runs, true, pending);
        // Keep this letter: masks hit here are satisfied from now on.
        List<Integer> still = new ArrayList<>();
        for (int diff : pending) {
            if (((diff >> pos) & 1) == 0) still.add(diff);
        }
        walk(pos + 1, mask | (1 << pos), kept + 1, runs + (openRun ? 1 : 0), false, still);
    }

    private String build(int mask) {
        StringBuilder abbr = new StringBuilder();
        int run = 0;
        for (int i = 0; i < m; ++i) {
            if (((mask >> i) & 1) != 0) {
                if (run > 0) {
                    abbr.append(run);
                    run = 0;
                }
                abbr.append(target.charAt(i));
            } else {
                ++run;
            }
        }
        if (run > 0) abbr.append(run);
        return abbr.toString();
    }
}
