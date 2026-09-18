class Router {
    constructor(memoryLimit: number) {}

    addPacket(source: number, destination: number, timestamp: number): boolean {}

    forwardPacket(): number[] {}

    getCount(destination: number, startTime: number, endTime: number): number {}
}
