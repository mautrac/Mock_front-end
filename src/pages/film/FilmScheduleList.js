import React, { useState } from "react";
import daysOfWeek from "../../utils/DaysOfWeek";

import{
    ListGroup,
    ListGroupItem
} from 'reactstrap'

import "../../css/general.scss";


function FilmScheduleList(props) {

    var schedule = {};
    var isActive = {};
    
    props.film.schedule.forEach(element => {
        let d = new Date(element.timeSlot);
        let seatNumber = element.seatNumber;

        let date = element.timeSlot.substring(0, 10);
        let hour = d.toLocaleTimeString();

        if (schedule[date] === undefined) {
            schedule[date] = [];
            isActive[date] = false;
        }

        schedule[date].push({hour: hour, seatNumber: seatNumber});
    });
    
    const [isActiveHook, setActive] = useState(isActive);

    const handleClick = (e) => {
        console.log(e);
    }

    return (
        <> 
            <ListGroup horizontal style={{borderBottom: "1px solid", borderColor: "#002843", borderRadius: 0}}>
                
                    {Object.keys(schedule).map((s) => {
                        return (
                            <>
                                <ListGroupItem tag="button"  active={isActive[s]} onClick={handleClick} key={s}>
                                    <div style={{fontWeight: "bold"}} key={s}>
                                        {
                                            (() => {
                                                let d = new Date(s);
                                                let day = d.getDay();
                                                let date = d.toLocaleDateString().substring(0, 5);
                                                return `${date} - ${daysOfWeek[day]}`;
                                            })()
                                        }
                                    </div> 
                                    
                                </ListGroupItem>   
                            </>
                        )    
                    })}
               
            </ListGroup>         

        </>
    )
}

export {FilmScheduleList};