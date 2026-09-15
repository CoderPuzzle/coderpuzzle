import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    public List<String> mostVisitedPattern(String[] username, int[] timestamp, String[] website) {
        Map<String, List<int[]>> perUser = new HashMap<>(); // user -> (time, siteIndex)
        for (int i = 0; i < username.length; ++i) {
            perUser.computeIfAbsent(username[i], u -> new ArrayList<>()).add(new int[] { timestamp[i], i });
        }
        Map<List<String>, Set<String>> patternUsers = new HashMap<>();
        for (Map.Entry<String, List<int[]>> entry : perUser.entrySet()) {
            List<int[]> visits = entry.getValue();
            visits.sort((a, b) -> Integer.compare(a[0], b[0]));
            String[] sites = new String[visits.size()];
            for (int s = 0; s < visits.size(); ++s) sites[s] = website[visits.get(s)[1]];
            for (int i = 0; i < sites.length; ++i) {
                for (int j = i + 1; j < sites.length; ++j) {
                    for (int k = j + 1; k < sites.length; ++k) {
                        List<String> pattern = List.of(sites[i], sites[j], sites[k]);
                        patternUsers.computeIfAbsent(pattern, p -> new HashSet<>()).add(entry.getKey());
                    }
                }
            }
        }
        List<String> best = null;
        int bestScore = -1;
        for (Map.Entry<List<String>, Set<String>> entry : patternUsers.entrySet()) {
            int score = entry.getValue().size();
            if (score > bestScore || (score == bestScore && isSmaller(entry.getKey(), best))) {
                best = entry.getKey();
                bestScore = score;
            }
        }
        return best;
    }

    private boolean isSmaller(List<String> candidate, List<String> best) {
        if (best == null) return true;
        for (int i = 0; i < 3; ++i) {
            int cmp = candidate.get(i).compareTo(best.get(i));
            if (cmp != 0) return cmp < 0;
        }
        return false;
    }
}
