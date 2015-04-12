var AI = (function(){
    var order = [0, 1, 2, 6, 7, 8, 4, 3, 5];

    /*
        Assumes solving order is 0 -> 1 -> 2 -> 6 -> 7 -> 8 -> 4 -> 3 =>5
        0, 1, 2
        3, 4, 5
        6, 7, 8
    */
    var decisions = [ 
        [   // 0
            [[], 0, 1],
            [0, 0, 1],
            [2, 2, 3]
        ],
        
        [   //1
            [[], [], 1],
            [2, 1, 1],
            [2, 3, 3]
        ],
        
        [   //2
            [[], [], []],
            [2, 3, 3],
            [2, [1, 1, 2, 2, 2, 1, 1], 3]
        ],
        
        [   //3
            [[], [], []],
            [[], [], [2, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1]],
            [[], [], []]
        ],
        
        [   //4
            [[], [], []],
            [[2, 1, 2, 2, 2, 1, 1, 1], [], [1, 2, 1, 1, 1, 2, 2, 2]],
            [[], [], []]
        ],
        
        [   //5
            [[], [], []],
            [2, 2, 3],
            [[], 2, 3]
        ],
      
        [   //6
            [[], [], []],
            [2, 2, 3],
            [[], 2, 3]
        ],  
        
        [   //7
            [[], [], []],
            [[2, 3, 2, 2, 2], 3, 3],
            [[], [], 3]
        ],
        
        [   //8
            [[], [], []],
            [[2, 3, 3, 2, 2, 2], [2, 3, 3, 3, 2, 2, 2], [2, 3, 2, 2, 2]],
            [[], [], []]
        ],
    ];
    
    var getPosition = function(n, grid){
        for(var r = 0; r < 3; r++)
            for(var c = 0; c < 3; c++)
                if (grid.tiles[r][c] == n)
                    return {r: r, c: c};
    }
    
    
    return {
        computeSequence : function(grid){
            for(var i = 0; i < order.length; i++){
                var n = order[i];
                var r = Math.floor(n / 3);
                var c = n % 3;
                if (grid.tiles[r][c] != n){
                    var position = getPosition(n, grid);
                    return decisions[n][position.r][position.c];
                }
            }
        }
    }
})();
