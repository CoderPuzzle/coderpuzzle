class ParkingSystem {
    private slots: number[];

    constructor(big: number, medium: number, small: number) {
        this.slots = [0, big, medium, small];
    }

    addCar(carType: number): boolean {
        if (this.slots[carType] > 0) {
            this.slots[carType]--;
            return true;
        }
        return false;
    }
}
