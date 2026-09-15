pub struct FileSharing;

impl FileSharing {
    pub fn new(m: i32) -> Self {
        panic!("TODO")
    }

    pub fn join(&mut self, ownedChunks: Vec<i32>) -> i32 {
        panic!("TODO")
    }

    pub fn leave(&mut self, userID: i32) {
        panic!("TODO")
    }

    pub fn request(&mut self, userID: i32, chunkID: i32) -> Vec<i32> {
        panic!("TODO")
    }
}
