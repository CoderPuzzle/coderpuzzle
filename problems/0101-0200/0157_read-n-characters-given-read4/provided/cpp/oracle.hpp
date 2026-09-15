// Problem-provided oracle (the read4 wire). The wrapper constructs the
// oracle from its tagged case value plus the query budget; content is a
// generic OjValue array of 1-character strings.
class File {
  public:
    File(const OjValue& content, long long budget) : budget_(budget), position_(0) {
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
