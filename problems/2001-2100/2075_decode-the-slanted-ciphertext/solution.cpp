class Solution {
  public:
    string decodeCiphertext(string encodedText, int rows) {
        if (encodedText.empty()) {
            return "";
        }
        int cols = static_cast<int>(encodedText.size()) / rows;
        string decoded;
        decoded.reserve(encodedText.size());
        for (int start = 0; start < cols; ++start) {
            for (int row = 0, col = start; row < rows && col < cols; ++row, ++col) {
                decoded.push_back(encodedText[row * cols + col]);
            }
        }
        while (!decoded.empty() && decoded.back() == ' ') {
            decoded.pop_back();
        }
        return decoded;
    }
};
