import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] stringMatching(String[] words) {
        List<String> result = new ArrayList<>();
        for (int i = 0; i < words.length; i++) {
            for (int j = 0; j < words.length; j++) {
                if (j != i && words[j].contains(words[i])) {
                    result.add(words[i]);
                    break;
                }
            }
        }
        return result.toArray(new String[0]);
    }
}
