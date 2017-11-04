describe("Frog Jump", () => {

    var start;
    beforeEach(function () {
        start = new Date().getTime();
    });

    afterEach(function () {
        console.log("time taken::" + (new Date().getTime() - start));
    });

    describe("jumping", () => {
        console.log("beforeeeeeeeee");

        it("populate board", () => {
            console.log("reached here...");
            while (true) {
                console.log("reached here...");

                let board: Board = new Board(9, 5, 30, 20, 3);
                // let board: Board = new Board(9, 5, 30, 20, 3);
                // let board: Board = new Board(9, 5, 30, 20, 3);
                // let board: Board = new Board(8, 10, 30, 20, 3);
                board.populateBoard();
                let frogJump = new FrogJump(board, { row: -1, col: 3 })
                frogJump.startDigging();
                let totalRoutes: number = frogJump.completedRoutes.length;
                let successRoutes: Route[] = frogJump.completedRoutes.filter(route => route.cells.length == board.cells.length);
                console.log(frogJump.completedRoutes.length);
                console.log("route;completed:" + totalRoutes + " success routes:" + successRoutes.length);


                if (successRoutes.length > 0 && successRoutes.length < 3 && totalRoutes > 15) {
                    console.log("in break");
                    successRoutes.forEach((route, index) => {
                        var rowCellCount:number[]= new Array(9).fill(0).map((value, index) => {
                            let cells: Cell[] = route.cells.filter(cell => {
                                return cell.row==index;
                            })
                            return cells.length;
                        })
                        console.log("cell distribution:"+rowCellCount);
                        
                    });
                    break;
                }

            }
        });

        it("check missing cell contributions1", () => {
            console.log("reached here...new..");
            let board: Board = new Board(9, 5, 40, 20, 3);
            board.populateBoard();
            var cellStrings:string[]=board.cells.map<string>(cell=>`{row:${cell.row},col:${cell.col}}`)
            console.log(`[${cellStrings.join(",")}]`);
            
            let frogJump = new FrogJump(board, { row: -1, col: 3 })
            frogJump.startDigging();
            let successRoutes: Route[] = frogJump.completedRoutes.filter(route => route.cells.length == board.cells.length);
            console.log(`success routes:${successRoutes.length} ;total routes :${frogJump.completedRoutes.length}`);
            var routesAfterMissingCellMap:Map<Cell,Route[]>=frogJump.getRoutesAfterMissingCells();
            console.log("time taken11::" + (new Date().getTime() - start));
            routesAfterMissingCellMap.forEach((routes: Route[], cell: Cell) => {
                //console.log(cell, routes);
                console.log(`cell:${cell.row+":"+cell.col};success routes :${routes.filter(route=>route.remainingCells.length==0).length};total routes :${routes.length}`)
            });
            console.log("time taken22::" + (new Date().getTime() - start));
        });

        fit("do delta adding", () => {
            console.log("reached here...new..");
            let board: Board = new Board(9, 5, 40, 20, 3);
            board.populateBoard();
            var cellStrings:string[]=board.cells.map<string>(cell=>`{row:${cell.row},col:${cell.col}}`)
            console.log(`[${cellStrings.join(",")}]`);
            
            let frogJump = new FrogJump(board, { row: -1, col: 3 })
            frogJump.startDigging();
            let successRoutes: Route[] = frogJump.completedRoutes.filter(route => route.remainingCells.length==0);
            console.log(`success routes:${successRoutes.length} ;total routes :${frogJump.completedRoutes.length}`);
            var emptyCells:Cell[]=frogJump.getEmptyCells();
            //var emptyCells:Cell[]=[];
            emptyCells.forEach(cell=>{
                console.log("in delta");
                
                let deltaBoard=new Board();
                deltaBoard.cells=board.cells.slice();
                deltaBoard.cells.push(cell)
                let deltaFrogJump = new FrogJump(deltaBoard, { row: -1, col: 3 })
                deltaFrogJump.startDigging();
                let successRoutes: Route[] = deltaFrogJump.completedRoutes.filter(route => route.remainingCells.length==0);
                console.log(`delta success routes:${successRoutes.length} ;delta total routes :${deltaFrogJump.completedRoutes.length} neighbors:${deltaFrogJump.findNeighbors(cell,deltaBoard.cells).length};total cells:${deltaBoard.cells.length}`);
            })
            console.log("done");
            
           
        });

        
        console.log("after");

        it("returns fun", () => {

            let board: Board = new Board(9, 5, 30, 20, 3);
            board.populateBoard();

            // Arrange
            let frogJump = new FrogJump(board, { row: 0, col: 2 })


            frogJump.startDigging();

            // Assert
            //expect(result).toEqual("Hello World");
        });

        it("checks path by passing hardcoded cells", () => {

            let board: Board = new Board(9, 5, 30, 20, 3);
            //[1, 2], [2, 1], [2, 3], [3, 2]
            board.cells = [{row:1,col:0},{row:1,col:8},{row:2,col:4},{row:3,col:8},{row:1,col:4},{row:2,col:0},{row:2,col:8},{row:3,col:2},{row:0,col:4},{row:4,col:4},{row:2,col:5},{row:1,col:7},{row:1,col:1},{row:3,col:0},{row:3,col:3},{row:0,col:8},{row:2,col:1}]
            //board.populateBoard();

            // Arrange
            let frogJump = new FrogJump(board, { row: -1, col: 3 })
            frogJump.startDigging();
            var routes:Route[]=frogJump.completedRoutes;
            console.log(`success routes :${routes.filter(route=>route.remainingCells.length==0).length};total routes :${routes.length}`)

            // Assert
            //expect(result).toEqual("Hello World");
        });
        it("returns fun", () => {

            let board: Board = new Board(9, 5, 30, 20, 3);
            //[1, 2], [2, 1], [2, 3], [3, 2]
            board.cells = [{ row: 1, col: 2 }, { row: 2, col: 1 }, { row: 2, col: 3 }, { row: 3, col: 2 }, { row: 2, col: 2 }]
            //board.populateBoard();


            // Arrange
            let frogJump = new FrogJump(board, { row: 0, col: 2 })
            frogJump.completedRoutes

            frogJump.startDigging();

            // Assert
            //expect(result).toEqual("Hello World");
        });
        it("returns fun for life", () => {

            let board: Board = new Board(9, 5, 30, 20, 3);
            //[1, 2], [2, 1], [2, 3], [3, 2]
            board.cells = [{ row: 1, col: 2 }, { row: 2, col: 1 }, { row: 2, col: 3 }, { row: 3, col: 2 }, { row: 2, col: 2 }, { row: 3, col: 3 }]
            //board.populateBoard();


            // Arrange
            let frogJump = new FrogJump(board, { row: 0, col: 2 })


            frogJump.startDigging();
            console.log(frogJump.completedRoutes);


            // Assert   
            //expect(result).toEqual("Hello World");
        });

        it("returns fun for life", () => {
            var start = new Date().getTime();

            let board: Board = new Board(9, 5, 30, 20, 3);
            //[1, 2], [2, 1], [2, 3], [3, 2]
            board.cells =
                [

                    { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 1, col: 5 },
                    { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 2, col: 5 },
                    { row: 3, col: 1 }, { row: 3, col: 2 }, { row: 3, col: 3 }, { row: 3, col: 4 }, { row: 3, col: 5 },
                    { row: 4, col: 1 }, { row: 4, col: 2 }, { row: 4, col: 3 }//,{ row: 4, col: 4 }, { row: 5, col: 5 },
                ]

            let frogJump = new FrogJump(board, { row: 0, col: 2 })
            frogJump.startDigging();
            console.log(frogJump.completedRoutes);
            console.log(frogJump.completedRoutes.length);

            console.log(new Date().getTime() - start);

        });
    });
});