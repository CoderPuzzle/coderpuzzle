class Solution {

    public String restoreString(String s, int[] indices) {
        // indices[i] names s.charAt(i)'s destination outright, so just write
        // each character straight into its final slot.
        char[] result = new char[s.length()];
        for (int i = 0; i < s.length(); ++i) {
            result[indices[i]] = s.charAt(i);
        }
        return new String(result);
    }
}
