#include <vector>

class DataStream {
  public:
    // Running length of the current suffix of matched values: a match
    // grows it, any other number resets it to zero, and consec is just
    // "has the streak reached k". The window of the last k integers is
    // summarized in one integer — nothing is buffered.
    DataStream(int value, int k) : value_(value), k_(k), streak_(0) {}

    bool consec(int num) {
        streak_ = num == value_ ? streak_ + 1 : 0;
        return streak_ >= k_;
    }

  private:
    int value_;
    int k_;
    int streak_;
};
