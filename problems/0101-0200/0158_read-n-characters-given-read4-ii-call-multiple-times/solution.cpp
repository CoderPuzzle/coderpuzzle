class Solution {
  private:
    std::vector<std::string> buf4_ = std::vector<std::string>(4);
    int buf4_count_ = 0;
    int buf4_index_ = 0;

  public:
    int read(File &file, std::vector<int> queries, std::vector<std::string> &buf) {
        int total = 0;
        for (int n : queries) {
            total += transfer(file, n, buf, total);
        }
        return total;
    }

  private:
    int transfer(File &file, int n, std::vector<std::string> &buf, int offset) {
        int transferred = 0;
        while (transferred < n) {
            if (buf4_index_ == buf4_count_) {
                buf4_count_ = file.read4(buf4_);
                buf4_index_ = 0;
                if (buf4_count_ == 0) {
                    break;
                }
            }
            int take = std::min(buf4_count_ - buf4_index_, n - transferred);
            for (int index = 0; index < take; ++index) {
                buf[offset + transferred + index] = buf4_[buf4_index_ + index];
            }
            buf4_index_ += take;
            transferred += take;
        }
        return transferred;
    }
};
