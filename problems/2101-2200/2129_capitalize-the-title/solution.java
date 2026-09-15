import java.util.Locale;

class Solution {

    public String capitalizeTitle(String title) {
        String[] words = title.split(" ");
        for (int index = 0; index < words.length; index++) {
            String lowered = words[index].toLowerCase(Locale.ROOT);
            if (lowered.length() > 2) {
                lowered = Character.toUpperCase(lowered.charAt(0)) + lowered.substring(1);
            }
            words[index] = lowered;
        }
        return String.join(" ", words);
    }
}
