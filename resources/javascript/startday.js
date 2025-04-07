const currentDate = new Date(Date.now());
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
let yearPartOne;
let yearPartTwo;

if (currentMonth >= 0 && currentMonth <= 7) {
    yearPartOne = currentYear - 1;
    yearPartTwo = currentYear;
} else {
    yearPartOne = currentYear;
    yearPartTwo = currentYear + 1;
}

const bankHolsArray = [];

async function getBankHols() {
    const url = 'https://www.gov.uk/bank-holidays.json';
    const response = await fetch(url);
    const json = await response.json();
    const bankHols = json['england-and-wales'].events;
    let sep = [];
    let oct = [];
    let nov = [];
    let dec = [];
    let jan = [];
    let feb = [];
    let mar = [];
    let apr = [];
    let may = [];
    let jun = [];
    let jul = [];
    let aug = [];
    for (let i = 0; i < bankHols.length; i++) {
        if (bankHols[i].date.includes(`${yearPartOne}-09`)) {
            sep.push(bankHols[i].date);
        } else if (bankHols[i].date.includes(`${yearPartOne}-10`)) {
            oct.push(bankHols[i].date);
        } else if (bankHols[i].date.includes(`${yearPartOne}-11`)) {
            nov.push(bankHols[i].date);
        } else if (bankHols[i].date.includes(`${yearPartOne}-12`)) {
            dec.push(bankHols[i].date);
        } else if (bankHols[i].date.includes(`${yearPartTwo}-01`)) {
            jan.push(bankHols[i].date);
        } else if (bankHols[i].date.includes(`${yearPartTwo}-02`)) {
            feb.push(bankHols[i].date);
        } else if (bankHols[i].date.includes(`${yearPartTwo}-03`)) {
            mar.push(bankHols[i].date);
        } else if (bankHols[i].date.includes(`${yearPartTwo}-04`)) {
            apr.push(bankHols[i].date);
        } else if (bankHols[i].date.includes(`${yearPartTwo}-05`)) {
            may.push(bankHols[i].date);
        } else if (bankHols[i].date.includes(`${yearPartTwo}-06`)) {
            jun.push(bankHols[i].date);
        } else if (bankHols[i].date.includes(`${yearPartTwo}-07`)) {
            jul.push(bankHols[i].date);
        } else if (bankHols[i].date.includes(`${yearPartTwo}-08`)) {
            aug.push(bankHols[i].date);
        }
    }
    bankHolsArray.push(sep, oct, nov, dec, jan, feb, mar, apr, may, jun, jul, aug);
}

getBankHols();

const proRataHoursForm = document.getElementById("pro-rata-hours-form");
proRataHoursForm.addEventListener("submit", (e) => {
    e.preventDefault();
        // Add employee name
        const employeeName = document.getElementById("name").value;//-------------------------------------------------------------------------------------------<< input employee name
        // Full time hours worked per week and month of the financial year you start or your hours change
        const hpw = document.getElementById("full-time-equiv").value;//---------------------------------------------------------------------------------------<< input full time hours
        // Part time hours worked per week 
        const ptHpw = document.getElementById("part-time-hours").value;//-------------------------------------------------------------------------------------<< input part time hours
        // Working hours per day input
        let mondayWorkingHours = document.getElementById("mon-hours").value;//--------------------------------------------------------------------------<< input hours worked each day
        let tuesdayWorkingHours = document.getElementById("tues-hours").value;//------------------------------------------------------------------------<< input hours worked each day
        let wednesdayWorkingHours = document.getElementById("wed-hours").value;//-----------------------------------------------------------------------<< input hours worked each day
        let thursdayWorkingHours = document.getElementById("thurs-hours").value;//----------------------------------------------------------------------<< input hours worked each day
        let fridayWorkingHours = document.getElementById("fri-hours").value;//--------------------------------------------------------------------------<< input hours worked each day
        // check part time hours is more than full time equivalent hours
        if (ptHpw > hpw) {
            return alert("Contracted hours can't be more than full time equivalent hours.");
        }
        // check total of working hours per day equals hours worked per week
        let workingHoursPerDay = [mondayWorkingHours, tuesdayWorkingHours, wednesdayWorkingHours, thursdayWorkingHours, fridayWorkingHours];
        let totalWorkingHours = 0;
        for (let i = 0; i < workingHoursPerDay.length; i++) {
            totalWorkingHours += Number(workingHoursPerDay[i]);
        };
        if (totalWorkingHours !== Number(ptHpw)) {
            return alert("Part time hours doesn't match the total of each days contracted hours.");
        };
        // list of days worked for output statement
        const workingDayArray = [];
        if (mondayWorkingHours > 0) {
            workingDayArray.push(mondayWorkingHours + ' hours Monday');
        };
        if (tuesdayWorkingHours > 0) {
            workingDayArray.push(tuesdayWorkingHours + ' hours Tuesday');
        };
        if (wednesdayWorkingHours > 0) {
            workingDayArray.push(wednesdayWorkingHours + ' hours Wednesday');
        };
        if (thursdayWorkingHours > 0) {
            workingDayArray.push(thursdayWorkingHours + ' hours Thursday');
        };
        if (fridayWorkingHours > 0) {
            workingDayArray.push(fridayWorkingHours + ' hours Friday');
        };
        let workingDays = workingDayArray.join(', ');
        // Start month input and convert to month number
        const inputStartMonth = document.getElementById("start-month").value;//-----------------------------------------------------------------------------------<< input start month
        const inputStartDay = document.getElementById("start-day").value;//-----------------------------------------------------------------------------------------<< input start day
        let monthNumber;
        switch (inputStartMonth) {
            case 'September':
            monthNumber = 12;
            break;
            case 'October':
            monthNumber = 11;
            break;
            case 'November':
            monthNumber = 10;
            break;
            case 'December':
            monthNumber = 9;
            break;
            case 'January':
            monthNumber = 8;
            break;
            case 'February':
            monthNumber = 7;
            break;
            case 'March':
            monthNumber = 6;
            break;
            case 'April':
            monthNumber = 5;
            break;
            case 'May':
            monthNumber = 4;
            break;
            case 'June':
            monthNumber = 3;
            break;
            case 'July':
            monthNumber = 2;
            break;
            case 'August':
            monthNumber = 1;
            break;
            default:
                return alert('Please enter a valid date');
        };
        // array to hold output values each time calculateHolidayEntitlement function is called
        const ptHolEntArray = [];    
        function calculateHolidayEntitlement(startMonthNum, startDay, startMonth) {
            const monthArray = [['september', 30], ['october', 31], ['november', 30], ['december', 31], ['january', 31], ['february', 28], ['march', 31], ['april', 30], ['may', 31], ['june', 30], ['july', 31], ['august', 31]];
            const daysLeftInYear = [];
            const selectedDay = startDay;
            const selectedStartDate = startMonth;
            let i;
            switch (selectedStartDate) {
                case 'September':
                i = 0;
                monthArray[i][1] -= selectedDay;
                break;
                case 'October':
                i = 1;
                monthArray[i][1] -= selectedDay;
                break;
                case 'November':
                i = 2;
                monthArray[i][1] -= selectedDay;
                break;
                case 'December':
                i = 3;
                monthArray[i][1] -= selectedDay;
                break;
                case 'January':
                i = 4;
                monthArray[i][1] -= selectedDay;
                break;
                case 'February':
                i = 5;
                monthArray[i][1] -= selectedDay;
                break;
                case 'March':
                i = 6;
                monthArray[i][1] -= selectedDay;
                break;
                case 'April':
                i = 7;
                monthArray[i][1] -= selectedDay;
                break;
                case 'May':
                i = 8;
                monthArray[i][1] -= selectedDay;
                break;
                case 'June':
                i = 9;
                monthArray[i][1] -= selectedDay;
                break;
                case 'July':
                i = 10;
                monthArray[i][1] -= selectedDay;
                break;
                case 'August':
                i = 11;
                monthArray[i][1] -= selectedDay;
                break;
                default:
                    alert('Please enter a valid date');
            };
            for (; i < monthArray.length; i++) {
                daysLeftInYear.push(monthArray[i][1]);
            };
            let totalDaysInYear = 0;
            for (let i = 0; i < daysLeftInYear.length; i++) {
                totalDaysInYear += daysLeftInYear[i];
            };
            const ftHolEntProRata = totalDaysInYear / 7 * hpw / 10;
            // pro rata holiday entitlement based on part time hours
            const ptHolEntProRata = (ftHolEntProRata / hpw) * ptHpw;
            // Number of bank holidays based on month of the financial year you start or your hours change
            let ftBankHolEnt = 0;
            let mondayBankHol = 0;
            let tuesdayBankHol = 0;
            let wednesdayBankHol = 0;
            let thursdayBankHol = 0; 
            let fridayBankHol = 0;
            const monthIndex = bankHolsArray.length - startMonthNum;
            if (bankHolsArray[monthIndex].length > 0) {
                for (let i = 0; i < bankHolsArray[monthIndex].length; i++) {
                    if (startDay <= (new Date(bankHolsArray[monthIndex][i])).getDate()) {
                        ftBankHolEnt += 1;
                        let day = (new Date(bankHolsArray[monthIndex][i])).getDay();
                    switch(day) {
                        case 1:
                            mondayBankHol += 1;
                            break;
                        case 2: 
                            tuesdayBankHol += 1;
                            break;
                        case 3:
                            wednesdayBankHol += 1;
                            break;
                        case 4: 
                            thursdayBankHol += 1;
                            break;
                        case 5: 
                            fridayBankHol += 1;
                    };
                    }
                }
            }
            for (let i = monthIndex + 1; i < bankHolsArray.length; i++) {
                ftBankHolEnt += bankHolsArray[i].length;
                for (let j = 0; j < bankHolsArray[i].length; j++) {
                    let day = (new Date(bankHolsArray[i][j])).getDay();
                    switch(day) {
                        case 1:
                            mondayBankHol += 1;
                            break;
                        case 2: 
                            tuesdayBankHol += 1;
                            break;
                        case 3:
                            wednesdayBankHol += 1;
                            break;
                        case 4: 
                            thursdayBankHol += 1;
                            break;
                        case 5: 
                            fridayBankHol += 1;
                    };
                };
            };
            // number of bank holidays that fall on working days multiplied by the hours worked on these days then added to an array
            mondayBankHol *= mondayWorkingHours;
            tuesdayBankHol *= tuesdayWorkingHours;
            wednesdayBankHol *= wednesdayWorkingHours;
            thursdayBankHol *= thursdayWorkingHours;
            fridayBankHol *= fridayWorkingHours;
            const bankHolWorkdayHours = [mondayBankHol, tuesdayBankHol, wednesdayBankHol, thursdayBankHol, fridayBankHol];    
            //Bank holiday hours based on part time hours worked per week and month of the financial year you start or your hours change
            const ptBankHolEntProRata = ((ftBankHolEnt * (hpw / 5)) / hpw) * ptHpw;    
            let totalBankHolWorkDayHours = 0;    
            for (let i = 0; i < bankHolWorkdayHours.length; i++) {
                totalBankHolWorkDayHours += bankHolWorkdayHours[i];
            };    
            let ptHolEntBalance;
            if (ptBankHolEntProRata < totalBankHolWorkDayHours) {
                ptHolEntBalance = ptHolEntProRata - (totalBankHolWorkDayHours - ptBankHolEntProRata);
            } else if (ptBankHolEntProRata > totalBankHolWorkDayHours) {
                ptHolEntBalance = ptHolEntProRata + (ptBankHolEntProRata - totalBankHolWorkDayHours);
            } else {
                ptHolEntBalance = ptHolEntProRata;
            };
            // round up to the nearest 0.5
            const ptHolEntBalanceTrunc = Math.trunc(ptHolEntBalance);
            let ptHolEnt;
            if (ptHolEntBalance - ptHolEntBalanceTrunc > 0 && ptHolEntBalance - ptHolEntBalanceTrunc <= 0.5) {
                ptHolEnt = ptHolEntBalanceTrunc + 0.5;
            } else if (ptHolEntBalance - ptHolEntBalanceTrunc > 0.5 && ptHolEntBalance - ptHolEntBalanceTrunc < 1) {
                ptHolEnt = ptHolEntBalanceTrunc + 1;
            } else {
                ptHolEnt = ptHolEntBalanceTrunc;
            };
            // pus output value to array
            ptHolEntArray.push(ptHolEnt);
        };
        // call the function based on the start month input
        calculateHolidayEntitlement(monthNumber, inputStartDay, inputStartMonth);
        // call the function with the full 12 months
        calculateHolidayEntitlement(12, 1, "September");
        // display the output on the screen
        const formOutput = document.getElementById("form-output");
        formOutput.textContent = `${employeeName} is working ${ptHpw} hours per week; ${workingDays}. The ${ptHolEntArray[0]} hours of current leave include the bank holiday adjustment. The ${ptHolEntArray[1]} hours total leave include the bank holiday adjustment.`;
        // click a button to copy the output to clipboard
        const copyButton = document.getElementById("copy");
        copyButton.addEventListener("click", (e) => {
            e.preventDefault;
            navigator.clipboard.writeText(`${employeeName} is working ${ptHpw} hours per week; ${workingDays}. The ${ptHolEntArray[0]} hours of current leave include the bank holiday adjustment. The ${ptHolEntArray[1]} hours total leave include the bank holiday adjustment.`);
        });
});