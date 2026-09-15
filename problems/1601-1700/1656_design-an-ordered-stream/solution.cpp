#include <string>
#include <vector>

class OrderedStream {
  public:
    // One slot per id (index 0 unused) plus ptr_, the next id the output is
    // waiting for. A value never being the empty string, an empty slot marks
    // "not inserted yet".
    OrderedStream(int n) : slots_(n + 1), ptr_(1) {}

    vector<string> insert(int idKey, string value) {
        slots_[idKey] = value;
        vector<string> chunk;
        while (ptr_ < static_cast<int>(slots_.size()) && !slots_[ptr_].empty()) {
            chunk.push_back(slots_[ptr_]);
            ++ptr_;
        }
        return chunk;
    }

  private:
    vector<string> slots_;
    int ptr_;
};
