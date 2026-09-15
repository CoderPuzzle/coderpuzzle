import java.util.ArrayList;
import java.util.List;

class Codec {

    // Counter-indexed tiny URLs: the object keeps every URL it has
    // encoded, in order, and answers with "http://tinyurl.com/" plus the
    // URL's 1-based position in that list written in lowercase base-36 —
    // "1" for the first, "a" for the tenth, "10" for the 36th.
    private final List<String> urls = new ArrayList<>();

    public String encode(String longUrl) {
        urls.add(longUrl);
        StringBuilder suffix = new StringBuilder();
        // divmod yields the least-significant digit first, so each new
        // digit is prepended — the loop ends with the most significant.
        for (int position = urls.size(); position > 0; position /= 36) {
            suffix.insert(0, Character.forDigit(position % 36, 36));
        }
        return "http://tinyurl.com/" + suffix;
    }

    public String decode(String shortUrl) {
        String suffix = shortUrl.substring("http://tinyurl.com/".length());
        return urls.get(Integer.parseInt(suffix, 36) - 1);
    }
}
