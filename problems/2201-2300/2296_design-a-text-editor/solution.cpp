#include <string>

// Two stacks split at the cursor: left_ holds the text before the cursor
// bottom-to-top, right_ the text after it nearest-char-on-top, so the
// characters adjacent to the cursor are always the two backs.
class TextEditor {
  public:
    TextEditor() {}

    void addText(string text) { left_ += text; }

    int deleteText(int k) {
        int deleted = static_cast<int>(left_.size());
        if (deleted > k) {
            deleted = k;
        }
        left_.resize(left_.size() - deleted);
        return deleted;
    }

    string cursorLeft(int k) {
        transfer(left_, right_, k);
        return tail();
    }

    string cursorRight(int k) {
        transfer(right_, left_, k);
        return tail();
    }

  private:
    // Moves min(k, size) characters from the back of `from` onto the back
    // of `to` — exactly the cursor sliding k positions.
    static void transfer(string &from, string &to, int k) {
        if (k > static_cast<int>(from.size())) {
            k = static_cast<int>(from.size());
        }
        for (; k > 0; --k) {
            to.push_back(from.back());
            from.pop_back();
        }
    }

    string tail() const {
        const size_t start = left_.size() >= 10 ? left_.size() - 10 : 0;
        return left_.substr(start);
    }

    string left_;
    string right_;
};
