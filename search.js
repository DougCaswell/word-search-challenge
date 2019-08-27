/***
 * search (grid, wordlist)
 * This function accepts a grid (a 2d array of letters)
 * and a wordlist (an array of words to search for). The function finds any words
 * that exist in the word search in any of the 8 possible directions (up, down, left, right
 * and all 4 diagonal directions). This function is case-insensitive in its matching.
 *
 * Returns: an array of words that can be found in the word search
 ***/
module.exports = function search(grid, wordlist) {
    let found = [];

    // searches grid left and right
    function leftAndRight(newGrid, word) {
        let right = newGrid.filter(row => row.join('').toLowerCase().includes(word.toLowerCase()));

        let left = newGrid.filter(row => [...row].reverse().join('').toLowerCase().includes(word.toLowerCase()));

        if (right[0] || left[0]) {
            found.push(word);
        }
    }

    // makes a modified grid then searches top and bottom by calling leftAndRight with the new Grid
    function topAndBottom(word) {
        let newGrid = [];
        for (let j = 0; j < grid.length; j++) {
            newGrid.push([]);
        };

        for (let j = 0; j < grid.length; j++) {
            for (let k = 0; k < grid[j].length; k++) {
                newGrid[k].push(grid[j][k]);
            };
        };

        leftAndRight(newGrid, word);
    }

    // figures out how many rows to make in a diagional grid, makes 2 grids with that many rows, fills them, then runs leftAndRight with the 2 new grids
    function diagionals(word) {
        let rowLength = grid[0].length;
        let dRowNum = grid.length + rowLength - 1

        let newGrid1 = [];
        for (let j = 0; j < dRowNum; j++) {
            newGrid1.push([]);
        };
        let newGrid2 = [];
        for (let j = 0; j < dRowNum; j++) {
            newGrid2.push([]);
        };

        for (let j = 0; j < newGrid1.length; j++) {
            for (let k = 0; 0 <= j - k; k++) {
                if (grid[k] && grid[j - k]) {
                    newGrid1[j].push(grid[j - k][k]);
                }
            }
        }
        for (let j = 0; j < newGrid2.length; j++) {
            for (let k = 0; 0 <= j - k; k++) {
                if (grid[k] && grid[j - k]) {
                    newGrid2[j].push(grid[j - k][rowLength - 1 - k]);
                }
            }
        }

        leftAndRight(newGrid1, word);
        leftAndRight(newGrid2, word);
    }

    for (let i = 0; i < wordlist.length; i++) {
        leftAndRight(grid, wordlist[i]);
        topAndBottom(wordlist[i]);
        diagionals(wordlist[i]);
    }
    return found;
}