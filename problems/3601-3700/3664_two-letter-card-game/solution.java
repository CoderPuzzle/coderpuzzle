class Solution {

    // A one-sided pool (26 counts, zeros included) plus `helpers` double-x
    // cards: every pair consumes at least one letter card, every pair needs
    // a partner outside the largest class, and only so many pairs fit at
    // all — the tight bound is the smallest.
    private int bestPairs(int[] counts, int helpers) {
        int total = 0;
        int largest = 0;
        for (int count : counts) {
            total += count;
            largest = Math.max(largest, count);
        }
        if (total == 0) {
            return 0;
        }
        return Math.min((total + helpers) / 2, Math.min(total + helpers - largest, total));
    }

    public int score(String[] cards, String x) {
        int both = 0;
        int[] firstOnly = new int[26];
        int[] secondOnly = new int[26];
        for (String card : cards) {
            char a = card.charAt(0);
            char b = card.charAt(1);
            if (a == x.charAt(0)) {
                if (b == x.charAt(0)) {
                    both++;
                } else {
                    firstOnly[b - 'a']++;
                }
            } else if (b == x.charAt(0)) {
                secondOnly[a - 'a']++;
            }
        }

        // Each double-x card is spent on one side or the other; every
        // matching splits that way, so scanning all splits covers everything.
        int best = 0;
        for (int give = 0; give <= both; give++) {
            best = Math.max(best, bestPairs(firstOnly, give) + bestPairs(secondOnly, both - give));
        }
        return best;
    }
}
