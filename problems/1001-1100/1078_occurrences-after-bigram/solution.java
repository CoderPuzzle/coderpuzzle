import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] findOcurrences(String text, String first, String second) {
        String[] words = text.split(" ");
        List<String> thirds = new ArrayList<>();
        // Bounding at words.length - 2 guarantees words[i + 2] always
        // exists, so a bigram landing on the last two words is never
        // inspected.
        for (int i = 0; i < words.length - 2; ++i) {
            if (words[i].equals(first) && words[i + 1].equals(second)) {
                thirds.add(words[i + 2]);
            }
        }
        return thirds.toArray(new String[0]);
    }
}
