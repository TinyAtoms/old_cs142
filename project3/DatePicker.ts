"use strict";

// The constructor takes an argument consisting of the id attribute for an existing div and a date selection callback function.
// When a date is selected the callback function should be called with the id argument and an object containing the properties month, day,
//  year with the number encoding of the date (e.g. {month: 1, day: 30, year: 2016} is the encoding of January 30, 2016).

class DatePicker {
  id: string;
  callback: Function;
  date: Date;

  constructor(id: string, callback: Function) {
    this.id = id;
    this.callback = callback;
  }
  render(date: Date) {
    date.setDate(1);
    this.date = date;


    // do controls
    let controlbox = <HTMLDivElement>document.createElement("DIV");
    controlbox.id = this.id + "controlbox";
    controlbox.className = "controlbox";

    let prev = <HTMLParagraphElement>document.createElement("P");
    prev.className = "prev";
    prev.innerText = "<";
    let prevf = this.prev.bind(this);
    prev.onclick = prevf;
    let ym = date.getFullYear() + "/" + (date.getMonth() + 1);
    let ymElement = <HTMLParagraphElement>document.createElement("P");
    ymElement.innerText = ym;
    let next = <HTMLParagraphElement>document.createElement("P");
    next.innerText = ">";
    next.className = "next";
    let nextf = this.next.bind(this);
    next.onclick = nextf;
    controlbox.appendChild(prev);
    controlbox.appendChild(ymElement);
    controlbox.appendChild(next);

    // create table
    let offset = date.getDay();
    let dayMultiplier = 86400000; // miliseconds in a day
    let startDate = date.valueOf() - offset * dayMultiplier;
    let daysDisplayed: Array<Date> = [];
    for (let i = 0; i < 35; i++) {
      daysDisplayed.push(new Date(startDate + i * dayMultiplier));
    }
    // chicking if last row is needed
    if (daysDisplayed[daysDisplayed.length - 1].getDate() === 7) {
      for (let i = 0; i < 7; i++) {
        daysDisplayed.pop();
      }
    }

    let monthTable: HTMLTableElement = <HTMLTableElement>(
      document.createElement("TABLE")
    );
    monthTable.id = this.id;

    // insert days of the month
    let weekdays = ["Su", "Mo", "Th", "We", "Th", "Fr", "Sa"];
    let head = monthTable.createTHead();
    let headrow = head.insertRow();
    for (let i = 0; i < 7; i++) {
      let temp = headrow.insertCell(i);
      temp.innerHTML = weekdays[i];
    }
    // create actual table filled with cells
    let body = monthTable.createTBody();
    for (let week = 0; week < daysDisplayed.length / 7; week++) {
      let weekrow = body.insertRow();

      for (let day = 0; day < 7; day++) {
        let dayCell = weekrow.insertCell(day);
        dayCell.id = daysDisplayed[day + week * 7].toDateString();
        dayCell.innerHTML = String(daysDisplayed[day + week * 7].getDate());
        // dirty, dirty hack
        let bday = daysDisplayed[day + week * 7];
        let bday_args = {day : bday.getDate(), month : bday.getMonth(), year : bday.getFullYear()};
        let args = [this.callback, this.id, bday_args];
        let anon_cb = function(){
            this[0](this[1], this[2]);
        }.bind(args);
        dayCell.onclick = anon_cb;

      }
    }

    // select the div element
    let element = document.getElementById(this.id);
    element.replaceWith(monthTable);

    let parent = monthTable.parentNode;
    parent.insertBefore(controlbox, monthTable);
  }

  next() {
    let newDate = new Date(this.date);
    newDate.setMonth(newDate.getMonth() + 1);
    let old_control = document.getElementById(this.id + "controlbox");
    old_control.parentNode.removeChild(old_control);
    this.render(newDate);
  }
  prev() {
    let newDate = new Date(this.date);
    let old_control = document.getElementById(this.id + "controlbox");
    old_control.parentNode.removeChild(old_control);
    newDate.setMonth(newDate.getMonth() - 1);
    this.render(newDate);
  }
}
