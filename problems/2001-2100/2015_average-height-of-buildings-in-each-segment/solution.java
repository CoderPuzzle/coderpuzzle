import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

class Solution {

    public int[][] averageHeightOfBuildings(int[][] buildings) {
        TreeMap<Integer, long[]> events = new TreeMap<>();
        for (int[] building : buildings) {
            long[] start = events.computeIfAbsent(building[0], ignored -> new long[2]);
            start[0] += building[2];
            start[1] += 1;
            long[] end = events.computeIfAbsent(building[1], ignored -> new long[2]);
            end[0] -= building[2];
            end[1] -= 1;
        }

        List<Integer> coordinates = new ArrayList<>(events.keySet());
        List<int[]> street = new ArrayList<>();
        long heightSum = 0;
        long count = 0;
        for (int index = 0; index + 1 < coordinates.size(); ++index) {
            int left = coordinates.get(index);
            long[] event = events.get(left);
            heightSum += event[0];
            count += event[1];
            int right = coordinates.get(index + 1);
            if (count == 0) {
                continue;
            }
            int average = (int) (heightSum / count);
            if (
                !street.isEmpty() &&
                street.get(street.size() - 1)[1] == left &&
                street.get(street.size() - 1)[2] == average
            ) {
                street.get(street.size() - 1)[1] = right;
            } else {
                street.add(new int[] { left, right, average });
            }
        }
        return street.toArray(new int[street.size()][]);
    }
}
