class Solution {

    public int numberOfMatches(int n) {
        // Play the rounds exactly as the statement prescribes: while more
        // than one team remains, the round plays teams / 2 matches — an
        // even field plays n / 2, an odd one (n - 1) / 2, both the floor
        // half — and advances teams / 2 winners plus the bye team, i.e.
        // teams / 2 + teams % 2. n = 1 never enters the loop and answers 0.
        int teams = n;
        int matches = 0;
        while (teams > 1) {
            matches += teams / 2;
            teams = teams / 2 + (teams % 2);
        }
        return matches;
    }
}
