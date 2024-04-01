import React from 'react';
import { Select, Box, VStack, HStack, Image, Button } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../State/Context.js';

export default function LocTimeSelector(props) {
    const { state, setState } = useContext(AppContext);
    const { city, month, year, day, setCity, setMonth, setYear, setDay, generateAll } = props;
    const [daysInMonth, setDaysInMonth] = useState(0); 
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if (month !== '' && year !== '') {
            const days = new Date(year, month, 0).getDate();
            setDaysInMonth(days);
        }
    }, [month, year]);

    // set day back to empty string when month or year changes
    useEffect(() => {
        setDay('');
    }, [month, year]);

    useEffect(() => {
        if (city && month && year && day) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [city, month, year, day]);


    return (
        <>

            <HStack>
                <Select placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="chicago">Chicago</option>
                    <option value="new_york">New York</option>
                    <option value="los_angeles">Los Angeles</option>
                    <option value="london">London</option>
                </Select>

                <Select placeholder="Month" value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </Select>

                <Select placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)}>
                    {Array.from({ length: 2023 - 1970 }, (_, i) => 1970 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </Select>
                <Select placeholder="Day" value={day} onChange={(e) => setDay(e.target.value)} disabled={!month || !year}>
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </Select>

                <Button width="150px" isDisabled={buttonDisabled} onClick={() => generateAll()}>
                    Submit
                </Button>
            </HStack>
        </>
    )
}