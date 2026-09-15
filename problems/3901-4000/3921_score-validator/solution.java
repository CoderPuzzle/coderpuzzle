class Solution {

    public int[] scoreValidator(String[] events) {
        // Single left-to-right pass. Only "W" moves the counter, so it alone
        // can trigger the stop-at-10 rule; scoring events never stop anything.
        int score = 0;
        int counter = 0;
        for (String event : events) {
            if (event.equals("W")) {
                ++counter;
            } else if (event.equals("WD") || event.equals("NB")) {
                ++score;
            } else {
                score += event.charAt(0) - '0';
            }
            // Events after the counter reaches 10 are ignored entirely.
            if (counter == 10) break;
        }
        return new int[] { score, counter };
    }
}
