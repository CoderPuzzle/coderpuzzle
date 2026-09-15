class Solution {

    public String addSpaces(String s, int[] spaces) {
        StringBuilder result = new StringBuilder(s.length() + spaces.length);
        int spaceIndex = 0;
        for (int index = 0; index < s.length(); index++) {
            if (spaceIndex < spaces.length && spaces[spaceIndex] == index) {
                result.append(' ');
                spaceIndex++;
            }
            result.append(s.charAt(index));
        }
        return result.toString();
    }
}
