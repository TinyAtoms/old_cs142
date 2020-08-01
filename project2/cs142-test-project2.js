"use strict";
/*
 * This file tests the CS142 Project #2 JavaScript assignment problems. It prints what
 * it finds to the console log and updates the text being displayed in the window with a
 * summary of the results.
 */

// We assume these symbols will be globally defined by the user. These var statements
// will assign undefined to the symbol if it isn't global already.
// These global symbols are needed to test your file and you don't have to worry about them for Problem 3.
// var cs142MakeMultiFilter;
// var Cs142TemplateProcessor;


var vars = {
    p1Message: "SUCCESS",
    p2Message: "SUCCESS",
    p3Message: "SUCCESS",
    varDeclared: ["vars.varDeclared", "vars.p1Message", "vars.p2Message", "vars.p3Message"]

};

// ********************* Test cs142filter

if (typeof cs142MakeMultiFilter !== "function") {
  console.error(
    "cs142MakeMultiFilter is not a function",
    typeof cs142MakeMultiFilter
  );
  vars.p1Message = "FAILURE";
} else {
  var arraysAreTheSame = function arraysAreTheSame(a1, a2) {
    if (!Array.isArray(a1) || !Array.isArray(a2) || a1.length !== a2.length) {
      return false;
    }
    for (var i = 0; i < a1.length; i++) {
      if (a1[i] !== a2[i]) {
        return false;
      }
    }
    return true;
  };

  var originalArray = [1, 2, 3];
  var filterFunc = cs142MakeMultiFilter(originalArray);

  var secondArray = [1, 2, 3, 4];
  var filterFuncTwo = cs142MakeMultiFilter(secondArray);

  if (typeof filterFunc !== "function") {
    console.error(
      "cs142MakeMultiFilter does not return a function",
      filterFunc
    );
    vars.p1Message = "FAILURE";
  } else {
    var result = filterFunc();
    if (!arraysAreTheSame([1, 2, 3], result)) {
      console.error(
        "filter function with no args does not return the original array",
        result
      );
      vars.p1Message = "FAILURE";
    }

    var callbackPerformed = false;
    result = filterFunc(
      function(item) {
        return item !== 2;
      },
      function(callbackResult) {
        callbackPerformed = true;
        if (!arraysAreTheSame([1, 3], callbackResult)) {
          console.error(
            "filter function callback does not filter 2 correctly",
            callbackResult
          );
          vars.p1Message = "FAILURE";
        }
        if (!arraysAreTheSame([1, 2, 3], this)) {
          console.error(
            "filter function callback does not pass original array as this",
            this
          );
          vars.p1Message = "FAILURE";
        }
      }
    );

    if (!callbackPerformed) {
      console.error("filter function callback not performed");
      vars.p1Message = "FAILURE";
    }

    if (result !== filterFunc) {
      console.error("filter function does not return itself", result);
      vars.p1Message = "FAILURE";
    }

    result = filterFunc(function(item) {
      return item !== 3;
    });
    if (result !== filterFunc) {
      console.error("filter function does not return itself 2", result);
      vars.p1Message = "FAILURE";
    }

    result = filterFunc();
    if (!arraysAreTheSame([1], result)) {
      console.error(
        "filter function callback does not filter 3 correctly",
        result
      );
      vars.p1Message = "FAILURE";
    }
    result = filterFuncTwo(
      function(item) {
        return item !== 1;
      },
      function(callbackResult) {
        if (!arraysAreTheSame([2, 3, 4], callbackResult)) {
          console.error(
            "second filter does not filter 1 (check for global variable usage)",
            callbackResult
          );
          vars.p1Message = "FAILURE";
        }
        if (!arraysAreTheSame([1, 2, 3, 4], this)) {
          console.error(
            "filter function callback does not pass original array as this",
            this
          );
          vars.p1Message = "FAILURE";
        }
      }
    );
  }
}
console.log("Test cs142MakeMultiFilter:", vars.p1Message);

// ********************* Test Cs142TemplateProcessor

if (typeof Cs142TemplateProcessor !== "function") {
  console.error(
    "Cs142TemplateProcessor is not a function",
    Cs142TemplateProcessor
  );
  vars.p2Message = "FAILURE";
} else {
  vars.template =
    "My favorite month is {{month}} but not the day {{day}} or the year {{year}}";
  vars.dateTemplate = new Cs142TemplateProcessor(vars.template);

  vars.dictionary = { month: "July", day: "1", year: "2016" };
  vars.str = vars.dateTemplate.fillIn(vars.dictionary);

  if (vars.str !== "My favorite month is July but not the day 1 or the year 2016") {
    console.error("Cs142TemplateProcessor didn't work");
    vars.p2Message = "FAILURE";
  }
  vars.varDeclared.push("template");
  vars.varDeclared.push("dateTemplate");
  vars.varDeclared.push("dictionary");
  vars.varDeclared.push("str");
}
console.log("Test Cs142TemplateProcessor:", vars.p2Message);

// ********************* Test to see if the symbols we defined are in the global address space

vars.varDeclared.forEach(function(sym) {
  if (window[sym] !== undefined) {
    console.error("Found my symbol", sym, "in DOM");
    vars.p3Message = "FAILURE";
  }
});
console.log("Test Problem 3:", vars.p3Message);

// Store the result back into the global space under the object name cs142Project2Results
window.cs142Project2Results = vars;


// Once the browser loads our companion HTML in cs142-test-project2.html we
// update it with the results of our testing. This code will make more
// sense after the next project.
window.onload = function() {
  document.getElementById("cs142p1").innerHTML = vars.p1Message;
  document.getElementById("cs142p2").innerHTML = vars.p2Message;
  document.getElementById("cs142p3").innerHTML = vars.p3Message;
};
