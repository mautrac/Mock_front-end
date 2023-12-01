import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";


const ScheduleUser = (props) => {
    console.log("asdasd");
    const now = new Date();
    var schedule = []
    schedule.push(now);
    for (let i = 1; i < 7; ++i) {
        let temp = new Date();
        temp.setDate(temp.getDate() + i);
        schedule.push(temp);
    }

    return (
        <>
            {/* <ListGroup horizontal>
                
                {schedule.map((value) => {

                    (<ListGroupItem >
                        <div>{value}</div>
                    </ListGroupItem>)
                })}
            </ListGroup> */}
            <div>
                asdhuiahopsdasdhiopasdhjiopasdhioasdasdhioasdhioasdhio
            </div>
        </>
    )
}

export default ScheduleUser;