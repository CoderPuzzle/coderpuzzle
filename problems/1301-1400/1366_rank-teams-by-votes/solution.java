import java.util.ArrayList;
import java.util.List;

class Solution {

    public String rankTeams(String[] votes) {
        boolean[] seen = new boolean[26];
        for (char c : votes[0].toCharArray()) seen[c - 'A'] = true;
        List<Character> teams = new ArrayList<>();
        for (char c = 'A'; c <= 'Z'; c++) {
            if (seen[c - 'A']) teams.add(c);
        }
        int p = votes[0].length();
        int[][] counts = new int[26][p];
        for (String vote : votes) {
            for (int i = 0; i < vote.length(); i++) {
                counts[vote.charAt(i) - 'A'][i] += 1;
            }
        }
        teams.sort((a, b) -> {
            int[] ra = counts[a - 'A'];
            int[] rb = counts[b - 'A'];
            for (int i = 0; i < ra.length; i++) {
                if (ra[i] != rb[i]) return rb[i] - ra[i];
            }
            return Character.compare(a, b);
        });
        StringBuilder sb = new StringBuilder();
        for (char c : teams) sb.append(c);
        return sb.toString();
    }
}
