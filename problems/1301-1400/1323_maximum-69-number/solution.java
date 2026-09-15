class Solution {

    public int maximum69Number(int num) {
        // The leftmost 6 carries the most weight, so flipping it is the one
        // best change; no 6 at all means the number is already maximal.
        return Integer.parseInt(Integer.toString(num).replaceFirst("6", "9"));
    }
}
