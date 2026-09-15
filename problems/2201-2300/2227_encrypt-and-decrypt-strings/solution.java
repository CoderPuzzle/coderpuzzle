import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Encrypter {

    private final Map<Character, String> forward = new HashMap<>();
    private final Map<String, Integer> encCounts = new HashMap<>();

    public Encrypter(String[] keys, String[] values, String[] dictionary) {
        for (int i = 0; i < keys.length; i++) {
            forward.put(keys[i].charAt(0), values[i]);
        }
        for (String word : dictionary) {
            String encrypted = encrypt(word);
            if (!encrypted.isEmpty()) {
                encCounts.merge(encrypted, 1, Integer::sum);
            }
        }
    }

    public String encrypt(String word1) {
        StringBuilder out = new StringBuilder(word1.length() * 2);
        for (int i = 0; i < word1.length(); i++) {
            String mapped = forward.get(word1.charAt(i));
            if (mapped == null) {
                return "";
            }
            out.append(mapped);
        }
        return out.toString();
    }

    public int decrypt(String word2) {
        return encCounts.getOrDefault(word2, 0);
    }
}
