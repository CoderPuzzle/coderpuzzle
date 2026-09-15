class Solution {

    public boolean canAliceWin(String[] a, String[] b) {
        // A legal reply depends only on the last played word: it must be
        // lexicographically greater and start with the same letter or the
        // next one, and every earlier play is <= that word, so words are
        // never replayed. Handing the opponent a larger threshold never
        // helps them (their reply options only shrink), so inside one
        // letter a player always answers with their largest remaining
        // word there, and a jump into the next letter is played at that
        // letter's largest word. After a player spends their largest word
        // of a letter they can never play in that letter again, so the
        // fight in each letter above the first is one reply long: enter
        // with your max, opponent answers with theirs or exits upward,
        // entrant exits upward or loses.
        //
        // Sweep letters top-down with enter[c] = "the player who enters
        // this letter with their largest word wins", then resolve Bob's
        // two options at the forced opener a[0]: answer inside the letter
        // or jump to the next letter at once.
        String[] maxA = new String[26];
        String[] maxB = new String[26];
        for (String w : a) {
            maxA[w.charAt(0) - 'a'] = w;
        }
        for (String w : b) {
            maxB[w.charAt(0) - 'a'] = w;
        }
        boolean[] entA = new boolean[26];
        boolean[] entB = new boolean[26];
        for (int c = 25; c >= 0; --c) {
            boolean hasA = maxA[c] != null;
            boolean hasB = maxB[c] != null;
            int nxt = c < 25 ? c + 1 : -1;
            if (hasA) {
                boolean bobExit = nxt >= 0 && maxB[nxt] != null && entB[nxt];
                boolean bobStay =
                    maxB[c] != null && maxB[c].compareTo(maxA[c]) > 0 && !(nxt >= 0 && maxA[nxt] != null && entA[nxt]);
                entA[c] = !(bobExit || bobStay);
            }
            if (hasB) {
                boolean aliceExit = nxt >= 0 && maxA[nxt] != null && entA[nxt];
                boolean aliceStay =
                    maxA[c] != null && maxA[c].compareTo(maxB[c]) > 0 && !(nxt >= 0 && maxB[nxt] != null && entB[nxt]);
                entB[c] = !(aliceExit || aliceStay);
            }
        }
        int c0 = a[0].charAt(0) - 'a';
        boolean bobExit = c0 < 25 && maxB[c0 + 1] != null && entB[c0 + 1];
        boolean battle = false;
        String b1 = maxB[c0];
        if (b1 != null && b1.compareTo(a[0]) > 0) {
            boolean aliceExit = c0 < 25 && maxA[c0 + 1] != null && entA[c0 + 1];
            String a1 = maxA[c0];
            boolean a1Wins = a1 != null && a1.compareTo(b1) > 0 && !bobExit;
            battle = !(a1Wins || aliceExit);
        }
        return !(bobExit || battle);
    }
}
