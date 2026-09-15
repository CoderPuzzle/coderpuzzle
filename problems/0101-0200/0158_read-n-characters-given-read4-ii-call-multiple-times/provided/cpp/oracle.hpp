// Problem-provided oracle (the read4 wire). The wrapper constructs the
// oracle from its tagged case values plus the query budget; content is a
// generic OjValue array of 1-character strings, capacity the judge's
// out-buffer allocation for the case (unused by the file).
class File {
  public:
    File(const OjValue& content, const OjValue& capacity, long long budget)
        : budget_(budget), position_(0) {
        for (const OjValue& item : content.items) {
            chars_.push_back(item.text);
        }
    }

    int read4(std::vector<std::string>& buf4) {
        if (budget_ <= 0) throw std::runtime_error("Oracle query budget exhausted");
        --budget_;
        int count = static_cast<int>(std::min<size_t>(4, chars_.size() - position_));
        for (int index = 0; index < count; ++index) {
            buf4[index] = chars_[position_ + index];
        }
        position_ += count;
        return count;
    }

  private:
    std::vector<std::string> chars_;
    long long budget_;
    std::size_t position_;
};
