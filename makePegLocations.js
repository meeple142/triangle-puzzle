function makePegLocations(){
   function rowStart(countInRow){
      return 0.5 * (dX * countInRow) - 0.5
   }
   
   var dX = 1,
       dY = dX * Math.sqrt(3) / 2,
       countInRow = 1,
       pegCount = 15,
       pegI,
       rowI = 0,
       rowStartX = rowStart(countInRow),
       locations = [];
       
       
       
       
   for(pegI = 0; pegI < pegCount; ++pegI){
      
      locations.push({
      dx : rowStartX + rowI * dX,
      dy : dY * countInRow
      });
      
      
      // next peg in this row
      rowI += 1;
      
      if(rowI === countInRow){
         // done with row add one to countInRow
         countInRow += 1;
         // reset rowI
         rowI = 0;
         // where do we start now?
         rowStartX = rowStart(countInRow);
      
      
      }
      
   }
   
   return locations;
}

console.log(makePegLocations());