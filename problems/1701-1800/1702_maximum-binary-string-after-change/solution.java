class Solution {

    public String maximumBinaryString(String binary) {
        // Both rules only shuffle zeros: "10" -> "01" slides a zero one
        // seat left, and "00" -> "10" fuses an adjacent pair into their
        // right seat. Herding all z zeros into the first one (index first)
        // parks the survivor at first + z - 1 with '1' everywhere else;
        // with at most one zero no move can improve the string.
        int zeros = 0;
        int first = -1;
        for (int i = 0; i < binary.length(); i++) {
            if (binary.charAt(i) == '0') {
                zeros++;
                if (first < 0) {
                    first = i;
                }
            }
        }
        if (zeros <= 1) {
            return binary;
        }
        int seat = first + zeros - 1;
        StringBuilder out = new StringBuilder(binary.length());
        for (int i = 0; i < binary.length(); i++) {
            out.append(i == seat ? '0' : '1');
        }
        return out.toString();
    }
}
