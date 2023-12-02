import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import * as Icon from 'react-feather';

import {TextInfor} from "../../custom_/Text"
import  '../../css/general.scss';
import { FilmScheduleListUser } from "./FilmScheduleListUser";

import filmApi from "../../api/FilmApi";
import scheduleApi from "../../api/ScheduleApi";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import api from "../../api/FilmApi";


function FilmInfor(props) {

    const label_width = 3;
    const input_width = {
        name: 9,
        description: 12,
        directors: 9,
        actors: 9,
        genre: 9,
        duration: 5,
        ticket_price: 5,
        release_date: 5
    }

    let film = {
        filmId: '',
        name: "",
        description: "",
        directors: "",
        actors: "",
        genre: "",
        duration: "",
        releaseDate: "",
        poster: '',
        ticketPrice: '',
        filmSchedules: [],
        user: {}
    };

    const [infor, setInfor] = useState(film);

    let location = useLocation();
    let filmId = location.pathname;
    
    filmId = filmId.split("/").slice(-1)[0];

    const getData = async () => {
        try {
            const result = await filmApi.getFilmById(filmId);
            film = {...result};
                        
            const result2 = await scheduleApi.getSchedulesByFilmId(filmId);
            film.filmSchedules = result2;
            film.duration = film.duration.split(' ')[0];
            setInfor(film);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);
    
    return (
    <>
        <Container fluid>
            <div className="film-infor-form">
                <Row >
                    <>
                        
                            <Row>
                                <div className="film-infor-frame">
                                    <img src={infor.poster} 
                                    alt="anh" className="film-infor-img"
                                    />
                                </div>
                            </Row>
                            <br />
                    </>
                    <Col lg = {6} >
                        <div className="film-infor-edit-frame">
                                <Row>
                                    <h2 className="film-infor-film-name">
                                        {infor.name}
                                    </h2>
                                </Row>
                                <TextInfor
                                    classNameLabel="film-infor-label"
                                    label_width={label_width}
                                    input_width={input_width.directors}
                                    label="Directors"
                                    value={infor.directors}
                                />

                                <TextInfor
                                    classNameLabel="film-infor-label"
                                    label_width={label_width}
                                    input_width={input_width.directors}
                                    label="Actors"
                                    value={infor.actors}
                                />

                                <TextInfor
                                    classNameLabel="film-infor-label"
                                    label_width={label_width}
                                    input_width={input_width.genre}
                                    label="Genre"
                                    value={infor.genre}
                                />

                                <TextInfor
                                    classNameLabel="film-infor-label"
                                    label_width={label_width}
                                    input_width={input_width.duration}
                                    label="Duration"
                                    value={infor.duration}
                                />


                                <TextInfor
                                    classNameLabel="film-infor-label"
                                    label_width={label_width}
                                    input_width={input_width.ticket_price}
                                    label="Ticket price"
                                    value={infor.ticketPrice}
                                /> 


                                <TextInfor
                                    classNameLabel="film-infor-label"
                                    label_width={label_width}
                                    input_width={input_width.release_date}
                                    label="Release date"
                                    value={infor.releaseDate}
                                />
                                <div className="film-infor-schedules">
                                    <Row >
                                        <Col lg="auto">
                                            <h3>Film schedule</h3>
                                        </Col>
                                    </Row>

                                    <FilmScheduleListUser schedules={infor.filmSchedules} />
                                </div>
                        </div> 
                    </Col>
                </Row>              
                                
            </div>

        </Container>
                
    </>
  )

}



export default FilmInfor;