class Bank {
  public:
    Bank(vector<long long> balance);
    bool transfer(int account1, int account2, long long money);
    bool deposit(int account, long long money);
    bool withdraw(int account, long long money);
};
