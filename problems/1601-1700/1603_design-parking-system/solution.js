class ParkingSystem {
    constructor(big, medium, small) {
        this.slots = [0, big, medium, small];
    }

    addCar(carType) {
        if (this.slots[carType] > 0) {
            this.slots[carType]--;
            return true;
        }
        return false;
    }
}
