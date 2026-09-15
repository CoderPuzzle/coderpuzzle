class Solution {
  public:
    string maximumBinaryString(string binary) {
        // Both rules only shuffle zeros: "10" -> "01" slides a zero one
        // seat left, and "00" -> "10" fuses an adjacent pair into their
        // right seat. Herding all z zeros into the first one (index first)
        // parks the survivor at first + z - 1 with '1' everywhere else;
        // with at most one zero no move can improve the string.
        int zeros = count(binary.begin(), binary.end(), '0');
        if (zeros <= 1) {
            return binary;
        }
        size_t seat = binary.find('0') + zeros - 1;
        string out(binary.size(), '1');
        out[seat] = '0';
        return out;
    }
};
