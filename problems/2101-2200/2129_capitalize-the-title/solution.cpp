class Solution {
  public:
    string capitalizeTitle(string title) {
        int start = 0;
        for (int end = 0; end <= static_cast<int>(title.size()); ++end) {
            if (end < static_cast<int>(title.size()) && title[end] != ' ') {
                continue;
            }
            for (int index = start; index < end; ++index) {
                title[index] = static_cast<char>(tolower(static_cast<unsigned char>(title[index])));
            }
            if (end - start > 2) {
                title[start] = static_cast<char>(toupper(static_cast<unsigned char>(title[start])));
            }
            start = end + 1;
        }
        return title;
    }
};
