import { useState, useEffect } from "react";
import { Calendar } from "./calendar";
import dayjs from "dayjs";

const DateRangePicker=(props)=>{

const {selectedRange , setSelectedRange} = props; 

  const [initialMonthAndYear, setInitialMonthAndYear] = useState(dayjs());
  useEffect(() => {
   console.log(initialMonthAndYear);
  }, [initialMonthAndYear]);

  return (
    <div style={{width:"70%",padding: '8px'}}>
      <Calendar
        initialRangeValuesProps={selectedRange}
        onRangeChange={(e) => setSelectedRange(e)}
        setOnRangeDateInScreen={(e) => setInitialMonthAndYear(e.start)}
      />
     
    </div>
  );
}
export default DateRangePicker;

