class Solution {

    public String removeVowels(String s) {
        StringBuilder kept = new StringBuilder(s.length());
        for (int i = 0; i < s.length(); ++i) {
            char c = s.charAt(i);
            if (c != 'a' && c != 'e' && c != 'i' && c != 'o' && c != 'u') kept.append(c);
        }
        return kept.toString();
    }
}
