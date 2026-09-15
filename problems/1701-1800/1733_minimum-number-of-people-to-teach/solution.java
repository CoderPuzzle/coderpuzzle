import java.util.ArrayList;
import java.util.List;

class Solution {

    public int minimumTeachings(int n, int[][] languages, int[][] friendships) {
        // Exactly one language may be taught, so a friendship that already
        // shares some language is settled forever and never forces teaching;
        // filter down to the needy pairs that share nothing. A chosen
        // language L fixes exactly the needy pairs whose both sides know L
        // afterwards, and a user lacking L is taught once however many
        // needy pairs it appears in — so the answer is the minimum, over
        // the n languages, of the users to teach.
        int users = languages.length;
        boolean[][] known = new boolean[users + 1][n + 1];
        for (int user = 1; user <= users; ++user) {
            for (int language : languages[user - 1]) known[user][language] = true;
        }
        List<int[]> needy = new ArrayList<>();
        for (int[] pair : friendships) {
            boolean shares = false;
            for (int language = 1; language <= n && !shares; ++language) {
                shares = known[pair[0]][language] && known[pair[1]][language];
            }
            if (!shares) needy.add(pair);
        }
        int best = users;
        for (int language = 1; language <= n; ++language) {
            // taught[user] keeps each user lacking this language counted
            // once across every needy pair it takes part in.
            boolean[] taught = new boolean[users + 1];
            int count = 0;
            for (int[] pair : needy) {
                for (int user : pair) {
                    if (!known[user][language] && !taught[user]) {
                        taught[user] = true;
                        ++count;
                    }
                }
            }
            best = Math.min(best, count);
        }
        return best;
    }
}
