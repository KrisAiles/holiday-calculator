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
            let ftBankHolEnt;
            let mondayBankHol = 0;
            let tuesdayBankHol = 0;
            let wednesdayBankHol = 0;
            let thursdayBankHol = 0; 
            let fridayBankHol = 0;
            if (startMonthNum === 1 && startDay > 24) {
                ftBankHolEnt = 0;
            } else if (startMonth === 1 && startDay <= 24) {
                ftBankHolEnt = 1;
                mondayBankHol = 1;
            } else if (startMonth === 3 || startMonth === 2) {
                ftBankHolEnt = 1;
                mondayBankHol = 1;
            } else if (startMonth === 4 && startDay > 25) {
                ftBankHolEnt = 1;
                mondayBankHol = 1;
            } else if (startMonth === 4 && startDay > 4 && startDay <= 25) {
                ftBankHolEnt = 2;
                mondayBankHol = 2;
            } else if (startMonth === 4 && startDay <= 4) {
                ftBankHolEnt = 3;
                mondayBankHol = 3;
            } else if (startMonth >= 5 && startDay > 21) {
                ftBankHolEnt = 3;
                mondayBankHol = 3;
            } else if (startMonth >= 5 && startDay <= 21) {
                ftBankHolEnt = 5;
                mondayBankHol = 4;
                fridayBankHol= 1;
            } else if (startMonthNum >= 6 && startMonthNum <= 8) {
                ftBankHolEnt = 5;
                mondayBankHol = 4;
                fridayBankHol= 1;
            } else if (startMonth === 9 && startDay > 24) {
                ftBankHolEnt = 6;
                mondayBankHol = 4;
                wednesdayBankHol = 1;
                fridayBankHol = 1;
            } else if (startMonth === 9 && startDay <= 24) {
                ftBankHolEnt = 8;
                mondayBankHol = 4;
                wednesdayBankHol = 2;
                thursdayBankHol = 1;
                fridayBankHol = 1;
            } else {
                ftBankHolEnt = 8;
                mondayBankHol = 4;
                wednesdayBankHol = 2;
                thursdayBankHol = 1;
                fridayBankHol = 1;
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