class Solution {

    public int countKeyChanges(String s) {
        char[] keys = s.toLowerCase().toCharArray();
        int changes = 0;
        for (int i = 1; i < keys.length; i++) {
            if (keys[i] != keys[i - 1]) {
                changes++;
            }
        }
        return changes;
    }
}
