import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public String arrangeWords(String text) {
        String[] words = text.split(" ");
        words[0] = words[0].toLowerCase();
        List<String> list = new ArrayList<>(Arrays.asList(words));
        list.sort((a, b) -> Integer.compare(a.length(), b.length()));
        String first = list.get(0);
        list.set(0, Character.toUpperCase(first.charAt(0)) + first.substring(1));
        return String.join(" ", list);
    }
}
