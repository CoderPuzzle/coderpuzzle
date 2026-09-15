import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[] findHighAccessEmployees(String[][] accessTimes) {
        // Bucket per employee; "HHMM" becomes 60 * HH + MM so the one-hour
        // rule is a plain integer span. After sorting a bucket, the employee
        // is high-access iff some three consecutive stamps span < 60: any
        // qualifying triple's earliest three members are consecutive, and a
        // consecutive triple under an hour is itself a witness.
        Map<String, List<Integer>> buckets = new HashMap<>();
        for (String[] entry : accessTimes) {
            int minutes = 60 * Integer.parseInt(entry[1].substring(0, 2)) + Integer.parseInt(entry[1].substring(2));
            buckets.computeIfAbsent(entry[0], k -> new ArrayList<>()).add(minutes);
        }
        List<String> answer = new ArrayList<>();
        for (Map.Entry<String, List<Integer>> bucket : buckets.entrySet()) {
            List<Integer> minutes = bucket.getValue();
            Collections.sort(minutes);
            for (int k = 0; k + 2 < minutes.size(); ++k) {
                if (minutes.get(k + 2) - minutes.get(k) < 60) {
                    answer.add(bucket.getKey());
                    break;
                }
            }
        }
        return answer.toArray(new String[0]);
    }
}
