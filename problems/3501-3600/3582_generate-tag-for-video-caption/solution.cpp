class Solution {
  public:
    string generateTag(string caption) {
        // Words are joined in order — the first word fully lowercase,
        // later words with only their first letter capitalized — then the
        // leading '#' plus English letters survive and the tag is cut to
        // 100 characters.
        string tag = "#";
        bool first = true;
        string word;
        for (int i = 0; i <= (int)caption.size(); ++i) {
            if (i == (int)caption.size() || caption[i] == ' ') {
                if (!word.empty()) {
                    for (char &ch : word) {
                        if (ch >= 'A' && ch <= 'Z')
                            ch += 32;
                    }
                    if (!first && word[0] >= 'a' && word[0] <= 'z')
                        word[0] -= 32;
                    first = false;
                    tag += word;
                    word.clear();
                }
            } else {
                word += caption[i];
            }
        }
        string kept = "#";
        for (int i = 1; i < (int)tag.size(); ++i) {
            char ch = tag[i];
            if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))
                kept += ch;
        }
        if (kept.size() > 100)
            kept.resize(100);
        return kept;
    }
};
