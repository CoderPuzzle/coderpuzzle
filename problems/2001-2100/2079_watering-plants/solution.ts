function wateringPlants(plants: number[], capacity: number): number {
    let steps = plants.length;
    let remaining = capacity;
    for (let index = 0; index < plants.length; index++) {
        if (remaining < plants[index]) {
            steps += 2 * index;
            remaining = capacity;
        }
        remaining -= plants[index];
    }
    return steps;
}
