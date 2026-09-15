class Solution {

    public String generateTag(String caption) {
        // Words are joined in order — the first word fully lowercase,
        // later words with only their first letter capitalized — then the
        // leading '#' plus English letters survive and the tag is cut to
        // 100 characters.
        String[] words = caption.split(" ");
        StringBuilder tag = new StringBuilder("#");
        int seen = 0;
        for (String word : words) {
            if (word.isEmpty()) continue;
            String lower = word.toLowerCase();
            if (seen == 0) {
                tag.append(lower);
            } else {
                tag.append(Character.toUpperCase(lower.charAt(0))).append(lower.substring(1));
            }
            ++seen;
        }
        StringBuilder kept = new StringBuilder("#");
        for (int i = 1; i < tag.length(); ++i) {
            char ch = tag.charAt(i);
            if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) kept.append(ch);
        }
        return kept.length() <= 100 ? kept.toString() : kept.substring(0, 100);
    }
}
