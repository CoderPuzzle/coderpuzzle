import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[][] highFive(int[][] items) {
        // Bucket every score by student, sort each bucket descending, and
        // average the top five with integer division.
        Map<Integer, List<Integer>> scores = new HashMap<>();
        for (int[] item : items) {
            scores.computeIfAbsent(item[0], k -> new ArrayList<>()).add(item[1]);
        }
        List<Integer> ids = new ArrayList<>(scores.keySet());
        Collections.sort(ids);
        int[][] result = new int[ids.size()][2];
        for (int i = 0; i < ids.size(); i++) {
            int sid = ids.get(i);
            List<Integer> list = scores.get(sid);
            list.sort((a, b) -> b - a);
            int total = 0;
            for (int j = 0; j < 5; j++) {
                total += list.get(j);
            }
            result[i] = new int[] { sid, total / 5 };
        }
        return result;
    }
}
