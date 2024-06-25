import Ship from './ship.js'

describe('Ship', () => {
  it('should register hits', () => {
    const testShip = new Ship({
      name: 'Cruiser',
      length: 5
    })

    testShip.hit();
    expect(testShip.hits).toBe(1);
  })

  it('should report sinking correctly', () => {
    const testShip = new Ship({
      name: 'Patrol Boat',
      length: 2
    })

    testShip.hit();
    expect(testShip.isSunk()).toBe(false);

    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  })
})