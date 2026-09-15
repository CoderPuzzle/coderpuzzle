class AuthenticationManager {
  public:
    AuthenticationManager(int timeToLive);
    void generate(string tokenId, int currentTime);
    void renew(string tokenId, int currentTime);
    int countUnexpiredTokens(int currentTime);
};
