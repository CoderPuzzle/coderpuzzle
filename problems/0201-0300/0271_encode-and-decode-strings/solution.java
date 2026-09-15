import java.util.ArrayList;
import java.util.List;

class Codec {

    // Length-prefixed chunks: each string travels as its decimal length, a
    // colon, then the string itself, concatenated in order. The prefix says
    // exactly how many characters belong to the piece, so no colon or digit
    // inside a string can be mistaken for structure.
    public String encode(String[] strs) {
        StringBuilder out = new StringBuilder();
        for (String word : strs) {
            out.append(word.length()).append(':').append(word);
        }
        return out.toString();
    }

    // The mirror walk: digits up to the next colon are the decimal length,
    // that many characters are the next string, and the cursor lands on
    // the following length.
    public String[] decode(String s) {
        List<String> words = new ArrayList<>();
        int position = 0;
        while (position < s.length()) {
            int colon = s.indexOf(':', position);
            int length = Integer.parseInt(s.substring(position, colon));
            words.add(s.substring(colon + 1, colon + 1 + length));
            position = colon + 1 + length;
        }
        return words.toArray(new String[0]);
    }
}
