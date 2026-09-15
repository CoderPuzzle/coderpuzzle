import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

class Solution {

    public String[] splitWordsBySeparator(String[] words, String separator) {
        // Split each word at every occurrence of separator and keep the non-empty
        // pieces: leading/trailing separators give empty edge pieces and adjacent
        // ones empty middle pieces; the statement excludes empties, so appending
        // the survivors in walk order yields exactly the required strings.
        List<String> result = new ArrayList<>();
        for (String word : words) {
            for (String piece : word.split(Pattern.quote(separator))) {
                if (!piece.isEmpty()) {
                    result.add(piece);
                }
            }
        }
        return result.toArray(new String[0]);
    }
}
