"use strict";

function cs142MakeMultiFilter(array : any) {

  function arrayFilterer(filter : Function, call : Function) {

    let currentArray = array;
    
    if (typeof(filter) !== "function"){
        return currentArray;
    }
    let newarr = [];
    for (var i = 0; i < currentArray.length; i++) {
      if (filter(currentArray[i])) {
        newarr.push(currentArray[i]);
      }
    }
    if (typeof(call) === "function"){
      
      call = call.bind(array);
      call(newarr);
    }
    return arrayFilterer;
  }
  return arrayFilterer;
}

