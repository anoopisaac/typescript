describe("Frog Jump", () => {
    var start;
    beforeEach(function () {
        start = new Date().getTime();
    });
    afterEach(function () {
        console.log("time taken::" + (new Date().getTime() - start));
    });
    describe("jumping", () => {
        console.log("before");
        fit("populate board", () => {
            while (true) {
                //let board: Board = new Board(9, 5, 30, 20, 3);
                //let board: Board = new Board(9, 5, 30, 20, 3);
                //let board: Board = new Board(9, 5, 30, 20, 3);
                let board = new Board(8, 10, 30, 20, 3);
                board.populateBoard();
                let frogJump = new FrogJump(board, { row: 0, col: 2 });
                frogJump.startDigging();
                console.log(frogJump.completedRoutes.length);
                if (frogJump.completedRoutes.filter(route => route.cells.length == board.cells.length).length > 0 &&
                    frogJump.completedRoutes.filter(route => route.cells.length == board.cells.length).length < 3 &&
                    frogJump.completedRoutes.length > 15) {
                    break;
                }
            }
            //expect(result).toEqual("Hello World");
        });
        console.log("after");
        it("returns fun", () => {
            let board = new Board(9, 5, 30, 20, 3);
            board.populateBoard();
            // Arrange
            let frogJump = new FrogJump(board, { row: 0, col: 2 });
            frogJump.startDigging();
            // Assert
            //expect(result).toEqual("Hello World");
        });
        it("returns fun", () => {
            let board = new Board(9, 5, 30, 20, 3);
            //[1, 2], [2, 1], [2, 3], [3, 2]
            board.cells = [{ row: 1, col: 2 }, { row: 2, col: 1 }, { row: 2, col: 3 }, { row: 3, col: 2 },];
            //board.populateBoard();
            // Arrange
            let frogJump = new FrogJump(board, { row: 0, col: 2 });
            frogJump.startDigging();
            // Assert
            //expect(result).toEqual("Hello World");
        });
        it("returns fun", () => {
            let board = new Board(9, 5, 30, 20, 3);
            //[1, 2], [2, 1], [2, 3], [3, 2]
            board.cells = [{ row: 1, col: 2 }, { row: 2, col: 1 }, { row: 2, col: 3 }, { row: 3, col: 2 }, { row: 2, col: 2 }];
            //board.populateBoard();
            // Arrange
            let frogJump = new FrogJump(board, { row: 0, col: 2 });
            frogJump.completedRoutes;
            frogJump.startDigging();
            // Assert
            //expect(result).toEqual("Hello World");
        });
        it("returns fun for life", () => {
            let board = new Board(9, 5, 30, 20, 3);
            //[1, 2], [2, 1], [2, 3], [3, 2]
            board.cells = [{ row: 1, col: 2 }, { row: 2, col: 1 }, { row: 2, col: 3 }, { row: 3, col: 2 }, { row: 2, col: 2 }, { row: 3, col: 3 }];
            //board.populateBoard();
            // Arrange
            let frogJump = new FrogJump(board, { row: 0, col: 2 });
            frogJump.startDigging();
            console.log(frogJump.completedRoutes);
            // Assert   
            //expect(result).toEqual("Hello World");
        });
        it("returns fun for life", () => {
            var start = new Date().getTime();
            let board = new Board(9, 5, 30, 20, 3);
            //[1, 2], [2, 1], [2, 3], [3, 2]
            board.cells =
                [
                    { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 1, col: 5 },
                    { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 2, col: 5 },
                    { row: 3, col: 1 }, { row: 3, col: 2 }, { row: 3, col: 3 }, { row: 3, col: 4 }, { row: 3, col: 5 },
                    { row: 4, col: 1 }, { row: 4, col: 2 }, { row: 4, col: 3 } //,{ row: 4, col: 4 }, { row: 5, col: 5 },
                ];
            let frogJump = new FrogJump(board, { row: 0, col: 2 });
            frogJump.startDigging();
            console.log(frogJump.completedRoutes);
            console.log(frogJump.completedRoutes.length);
            console.log(new Date().getTime() - start);
        });
    });
});
//# sourceMappingURL=Traverse.spec.js.map