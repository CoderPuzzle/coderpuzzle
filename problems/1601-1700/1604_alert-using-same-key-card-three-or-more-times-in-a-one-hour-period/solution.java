import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[] alertNames(String[] keyName, String[] keyTime) {
        // Group each worker's swipe times together; comparisons only ever
        // happen within one worker's own history.
        Map<String, List<Integer>> timesByName = new LinkedHashMap<>();
        for (int i = 0; i < keyName.length; i++) {
            String[] parts = keyTime[i].split(":");
            // Every swipe falls on a single day, so minutes-since-midnight is
            // all the arithmetic needed — no wraparound to handle.
            int minutes = 60 * Integer.parseInt(parts[0]) + Integer.parseInt(parts[1]);
            timesByName.computeIfAbsent(keyName[i], k -> new ArrayList<>()).add(minutes);
        }

        List<String> alerted = new ArrayList<>();
        for (Map.Entry<String, List<Integer>> entry : timesByName.entrySet()) {
            List<Integer> times = entry.getValue();
            Collections.sort(times);
            // A window of three consecutive swipes spans at most 60 minutes
            // exactly when the alert condition is met.
            for (int i = 0; i + 2 < times.size(); i++) {
                if (times.get(i + 2) - times.get(i) <= 60) {
                    alerted.add(entry.getKey());
                    break;
                }
            }
        }

        Collections.sort(alerted);
        return alerted.toArray(new String[0]);
    }
}
