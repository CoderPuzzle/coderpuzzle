import java.util.Map;
import java.util.TreeMap;

class Solution {

    public int brightestPosition(int[][] lights) {
        TreeMap<Integer, Integer> events = new TreeMap<>();
        for (int[] light : lights) {
            events.merge(light[0] - light[1], 1, Integer::sum);
            events.merge(light[0] + light[1] + 1, -1, Integer::sum);
        }

        int brightness = 0;
        int bestBrightness = 0;
        int answer = 0;
        for (Map.Entry<Integer, Integer> event : events.entrySet()) {
            brightness += event.getValue();
            if (brightness > bestBrightness) {
                bestBrightness = brightness;
                answer = event.getKey();
            }
        }
        return answer;
    }
}
