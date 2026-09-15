class Solution {
  public:
    bool canAliceWin(vector<string> &a, vector<string> &b) {
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
        array<string, 26> maxA, maxB;
        array<bool, 26> hasA{}, hasB{};
        for (const string &w : a) {
            maxA[w[0] - 'a'] = w;
            hasA[w[0] - 'a'] = true;
        }
        for (const string &w : b) {
            maxB[w[0] - 'a'] = w;
            hasB[w[0] - 'a'] = true;
        }
        array<bool, 26> entA{}, entB{};
        for (int c = 25; c >= 0; --c) {
            bool hasNext = c < 25;
            if (hasA[c]) {
                bool bobExit = hasNext && hasB[c + 1] && entB[c + 1];
                bool bobStay = hasB[c] && maxB[c] > maxA[c] && !(hasNext && hasA[c + 1] && entA[c + 1]);
                entA[c] = !(bobExit || bobStay);
            }
            if (hasB[c]) {
                bool aliceExit = hasNext && hasA[c + 1] && entA[c + 1];
                bool aliceStay = hasA[c] && maxA[c] > maxB[c] && !(hasNext && hasB[c + 1] && entB[c + 1]);
                entB[c] = !(aliceExit || aliceStay);
            }
        }
        int c0 = a[0][0] - 'a';
        bool bobExit = c0 < 25 && hasB[c0 + 1] && entB[c0 + 1];
        bool battle = false;
        if (hasB[c0] && maxB[c0] > a[0]) {
            const string &b1 = maxB[c0];
            bool aliceExit = c0 < 25 && hasA[c0 + 1] && entA[c0 + 1];
            bool a1Wins = hasA[c0] && maxA[c0] > b1 && !bobExit;
            battle = !(a1Wins || aliceExit);
        }
        return !(bobExit || battle);
    }
};
