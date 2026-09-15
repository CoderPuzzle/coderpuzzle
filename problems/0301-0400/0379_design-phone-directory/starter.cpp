class PhoneDirectory {
  public:
    PhoneDirectory(int maxNumbers);
    int get();
    bool check(int number);
    void release(int number);
};
