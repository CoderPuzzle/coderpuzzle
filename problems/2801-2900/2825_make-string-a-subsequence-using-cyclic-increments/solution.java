class Solution {

    public boolean canMakeSubsequence(String str1, String str2) {
        // Walk str1 once with a pointer into str2. Whenever str2[j] equals
        // str1[i], or equals its cyclic successor, take the pair and advance
        // both pointers: claiming the earliest eligible slot never displaces
        // a better later choice, because everything that fits after it also
        // fits after any other valid pick. Matching all of str2 this way is
        // exactly what was asked for.
        int j = 0;
        for (int i = 0; i < str1.length(); ++i) {
            if (j < str2.length() && (str2.charAt(j) - str1.charAt(i) + 26) % 26 <= 1) {
                ++j;
            }
        }
        return j == str2.length();
    }
}
