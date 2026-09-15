pub struct AuthenticationManager;

impl AuthenticationManager {
    pub fn new(timeToLive: i32) -> Self {
        panic!("TODO")
    }

    pub fn generate(&mut self, tokenId: String, currentTime: i32) {
        panic!("TODO")
    }

    pub fn renew(&mut self, tokenId: String, currentTime: i32) {
        panic!("TODO")
    }

    pub fn countUnexpiredTokens(&mut self, currentTime: i32) -> i32 {
        panic!("TODO")
    }
}
