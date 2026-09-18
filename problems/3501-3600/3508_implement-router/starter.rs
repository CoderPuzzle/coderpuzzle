pub struct Router;

impl Router {
    pub fn new(memoryLimit: i32) -> Self {
        panic!("TODO")
    }

    pub fn addPacket(&mut self, source: i32, destination: i32, timestamp: i32) -> bool {
        panic!("TODO")
    }

    pub fn forwardPacket(&mut self) -> Vec<i32> {
        panic!("TODO")
    }

    pub fn getCount(&mut self, destination: i32, startTime: i32, endTime: i32) -> i32 {
        panic!("TODO")
    }
}
