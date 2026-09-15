class Solution {

    public String compressedString(String word) {
        // One sweep over the runs of equal characters, slicing each run
        // into chunks of at most nine because that is all one operation may
        // remove -- a length-14 run therefore encodes as "9c5c".
        StringBuilder comp = new StringBuilder();
        int i = 0;
        int n = word.length();
        while (i < n) {
            char c = word.charAt(i);
            int j = i;
            while (j < n && word.charAt(j) == c && j - i < 9) {
                j++;
            }
            comp.append(j - i).append(c);
            i = j;
        }
        return comp.toString();
    }
}
