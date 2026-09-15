import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[] findRestaurant(String[] list1, String[] list2) {
        // The strings of each list are unique, so one map from a string to
        // its index in list1 settles every "where does it count from" query.
        Map<String, Integer> indexOf = new HashMap<>();
        for (int i = 0; i < list1.length; ++i) {
            indexOf.put(list1[i], i);
        }
        int best = 0;
        List<String> result = new ArrayList<>();
        for (int j = 0; j < list2.length; ++j) {
            Integer i = indexOf.get(list2[j]);
            if (i == null) {
                continue;
            }
            // A strictly smaller index sum restarts the winners at the new
            // minimum; an equal one extends the tie, so the winners come out
            // in the order they appear in list2.
            if (result.isEmpty() || i + j < best) {
                best = i + j;
                result = new ArrayList<>();
                result.add(list2[j]);
            } else if (i + j == best) {
                result.add(list2[j]);
            }
        }
        return result.toArray(new String[0]);
    }
}
