class TrafficLight {

    // Road 1 (A) is green initially; the lock serializes arrivals so the
    // light is switched only when the crossing road actually changes and
    // no two cars from different roads ever cross together.
    private final Object lock = new Object();
    private int greenRoad = 1;

    public TrafficLight() {}

    public void carArrived(int carId, int roadId, int direction, Runnable turnGreen, Runnable crossCar)
        throws InterruptedException {
        synchronized (lock) {
            if (greenRoad != roadId) {
                turnGreen.run();
                greenRoad = roadId;
            }
            crossCar.run();
        }
    }
}
