import java.util.HashMap;
import java.util.Map;

class Solution {

    public String kthDistinct(String[] arr, int k) {
        Map<String, Integer> frequencies = new HashMap<>();
        for (String word : arr) {
            frequencies.put(word, frequencies.getOrDefault(word, 0) + 1);
        }
        for (String word : arr) {
            if (frequencies.get(word) == 1) {
                k--;
                if (k == 0) {
                    return word;
                }
            }
        }
        return "";
    }
}
