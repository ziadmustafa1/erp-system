/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // النمط الافتراضي
import 'react-date-range/dist/theme/default.css'; // الثيم الافتراضي

const DatePickerWithRange: React.FC<{ date: any, setDate: (range: any) => void }> = ({ date, setDate }) => {
    const [state, setState] = useState([
        {
            startDate: date?.from || new Date(),
            endDate: date?.to || addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    const handleSelect = (ranges: any) => {
        setState([ranges.selection]);
        setDate({ from: ranges.selection.startDate, to: ranges.selection.endDate });
    };

    return (
        <DateRangePicker
            onChange={handleSelect}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            ranges={state}
            direction="horizontal"
        />
    );
};

export default DatePickerWithRange;
