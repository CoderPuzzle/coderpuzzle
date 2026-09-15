class Solution {

    public String decodeCiphertext(String encodedText, int rows) {
        if (encodedText.isEmpty()) {
            return "";
        }
        int cols = encodedText.length() / rows;
        StringBuilder decoded = new StringBuilder(encodedText.length());
        for (int start = 0; start < cols; start++) {
            for (int row = 0, col = start; row < rows && col < cols; row++, col++) {
                decoded.append(encodedText.charAt(row * cols + col));
            }
        }
        while (decoded.length() > 0 && decoded.charAt(decoded.length() - 1) == ' ') {
            decoded.setLength(decoded.length() - 1);
        }
        return decoded.toString();
    }
}
