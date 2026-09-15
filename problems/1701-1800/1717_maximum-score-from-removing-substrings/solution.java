class Solution {

    public int maximumGain(String s, int x, int y) {
        // Remove the higher-priced pattern first: by exchange, the character
        // left behind still pairs with the other kind, so this never loses.
        if (x >= y) {
            Result first = removePairs(s, 'a', 'b', x);
            Result second = removePairs(first.rest, 'b', 'a', y);
            return first.score + second.score;
        }
        Result first = removePairs(s, 'b', 'a', y);
        Result second = removePairs(first.rest, 'a', 'b', x);
        return first.score + second.score;
    }

    private Result removePairs(String text, char first, char second, int points) {
        // Stack scan: `second` arriving on a top of `first` pops and scores;
        // everything else is pushed. Survivors are the text with every
        // non-overlapping removal of this pattern applied.
        StringBuilder stack = new StringBuilder();
        int score = 0;
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            int top = stack.length() - 1;
            if (top >= 0 && stack.charAt(top) == first && c == second) {
                stack.deleteCharAt(top);
                score += points;
            } else {
                stack.append(c);
            }
        }
        // The residue — including non-a/b characters, which never pair — is
        // exactly what the other pattern's pass sweeps next.
        return new Result(stack.toString(), score);
    }

    private static class Result {

        final String rest;
        final int score;

        Result(String rest, int score) {
            this.rest = rest;
            this.score = score;
        }
    }
}
