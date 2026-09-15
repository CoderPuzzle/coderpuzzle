import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;

class Solution {

    public String[] watchedVideosByFriends(String[][] watchedVideos, int[][] friends, int id, int level) {
        // BFS discovers nodes in increasing distance order, so the nodes whose
        // recorded distance equals `level` are exactly the level-k people.
        int n = friends.length;
        int[] dist = new int[n];
        java.util.Arrays.fill(dist, -1);
        dist[id] = 0;
        Queue<Integer> queue = new ArrayDeque<>();
        queue.add(id);
        Map<String, Integer> counts = new HashMap<>();
        while (!queue.isEmpty()) {
            int cur = queue.remove();
            if (dist[cur] == level) {
                for (String video : watchedVideos[cur]) {
                    counts.merge(video, 1, Integer::sum);
                }
                continue;
            }
            for (int nxt : friends[cur]) {
                if (dist[nxt] == -1) {
                    dist[nxt] = dist[cur] + 1;
                    queue.add(nxt);
                }
            }
        }
        List<Map.Entry<String, Integer>> entries = new ArrayList<>(counts.entrySet());
        entries.sort((a, b) ->
            !a.getValue().equals(b.getValue())
                ? Integer.compare(a.getValue(), b.getValue())
                : a.getKey().compareTo(b.getKey())
        );
        String[] result = new String[entries.size()];
        for (int index = 0; index < result.length; ++index) {
            result[index] = entries.get(index).getKey();
        }
        return result;
    }
}
