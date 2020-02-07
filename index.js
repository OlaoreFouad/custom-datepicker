(function() {
    
})();

var DAY = 86400000 // milliseconds in a day

var currentMonth = new Object();
var nextMonth = new Object();

function setDates() {
    var currentDate = new Date(Date.now())

    currentMonth = setWholeMonth(currentDate.getFullYear(), currentDate.getMonth()+1, currentDate.getDate());
    
    populateMonth(currentMonth, true)
    setNextMonth();
}

function setNextMonth() {
    var year = currentMonth.year;
    var month = currentMonth.monthIdx + 1;
    if (currentMonth.monthIdx == 11) {
        year++;
        month = 1;
    } else {
        month += 1;
    }
    var day = 1;

    const nextMonth = setWholeMonth(year, month, day);
    console.log(nextMonth);
    populateMonth(nextMonth, false);
}

function populateMonth(month, isCurrent) {
    const container = isCurrent ? document.getElementsByClassName('left')[0] : document.getElementsByClassName('right')[0];
    const monthContainer = container.getElementsByClassName('month')[0];
    monthContainer.innerText = `${ month.month } ${ month.year }`
    const daysOfTheWeek = container.getElementsByClassName('days-of-the-week')[0];

    const weeks = month.weeks;
    const entries = Object.entries(weeks);
    for (const [day, days] of entries) {
        const wk = document.createElement('week');
        wk.classList.add('week');
        const heading = document.createElement('div');
        heading.classList.add('heading');
        switch (day) {
            case 'sun':
                heading.innerText = 'Sun'
                break;
            case 'mon':
                heading.innerText = 'Mon'
                break;
            case 'tue':
                heading.innerText = 'Tue'
                break;
            case 'wed':
                heading.innerText = 'Wed'
                break;
            case 'thurs':
                heading.innerText = 'Thurs'
                break;
            case 'fri':
                heading.innerText = 'Fri'
                break;
            case 'sat':
                heading.innerText = 'Sat'
                break;
        
            default:
                break;
        }
        const list = document.createElement('ul');
        list.classList.add('days');
        days.forEach(d => {
            const day = document.createElement('li');
            day.innerText = d.toString();
            list.appendChild(day);
        })
        wk.appendChild(heading);
        wk.appendChild(list);
        daysOfTheWeek.appendChild(wk);
    }

    const week = document.createElement('week');
    week.classList.add('week');

}

function setWholeMonth(y, m, d) {
    const month = new Object();

    const bigDate = new Date(Date.parse(`${y}-${m}-${d}`));

    var monthIdx = bigDate.getMonth();
    var dateOfMonth = bigDate.getDate();
    console.log('Date Of Month: ' + dateOfMonth)

    month.month = getMonthByName(monthIdx);
    month.monthIdx = monthIdx;
    month.year = bigDate.getFullYear();
    month.numberOfDays = getDaysByNumber(monthIdx, month.year);
    var weeks = {
        sun: [], mon: [], tue: [], wed: [], thurs: [], fri: [], sat: []
    };
    for(let cnt = -dateOfMonth+1; cnt < month.numberOfDays-dateOfMonth+1; cnt++) {
        const date = new Date(bigDate.getTime() + (86400000 * cnt));
        console.log(`Date: ${ date.getDate() } Day: ${ date.getDay() }`);
        const dateDay = getDayByIndex(date.getDate());
        if (date.getDay() == 0) {
            weeks.sun.push(date.getDate());
        } else if (date.getDay() == 1) {
            weeks.mon.push(date.getDate());
        } else if (date.getDay() == 2) {
            weeks.tue.push(date.getDate());
        } else if (date.getDay() == 3) {
            weeks.wed.push(date.getDate());
        } else if (date.getDay() == 4) {
            weeks.thurs.push(date.getDate());
        } else if (date.getDay() == 5) {
            weeks.fri.push(date.getDate());
        } else if (date.getDay() == 6) {
            weeks.sat.push(date.getDate());            
        }
    }
    month.weeks = weeks;
    return month;
}

function getDayByIndex(dayIdx) {
    var day = '';

    switch(dayIdx) {
        case 0:
            day = 'Sunday';
            break;
        case 1:
            day = 'Monday';
            break;
        case 2:
            day = 'Tuesday';
            break;
        case 3:
            day = 'Wednesday';
            break;
        case 4:
            day = 'Thursday';
            break;
        case 5:
            day = 'Friday';
            break;
        case 6:
            day = 'Saturday';
            break;
    }

    return day;
}

// s, apr, jun, nov - 30
// jan, mar, may, jul, aug, oct, dec
// feb - 28/29
function getDaysByNumber(monthIdx, year) {
    var days = 0;
    switch(monthIdx) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            days = 31;
            break;
        case 8:
        case 3:
        case 5:
        case 10:
            days = 30;
            break;
        case 1:
            days = (year % 4 == 0) ? 29 : 28;
            break;
    }
    return days;
}

function getMonthByName(idx) {
    var month = ''
    switch(idx) {        
        case 0:
            month = 'January';
            break;
        case 1:
            month = 'February';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'June';
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8:
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 10:
            month = 'November';
            break;
        case 11:
            month = 'December';
            break;    
    }
    return month;
}
setDates();