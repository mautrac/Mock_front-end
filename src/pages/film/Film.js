import React, { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Row,

} from "reactstrap";
import {
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import { connect } from "react-redux";
import { selectFilms } from "../../redux/selectors/FilmSelector";
// import paginationFactory from "react-bootstrap-table2-paginator";
import { getListFilmAction } from "../../redux/actions/FilmActions";
import '../../css/film.css'

//api
import FilmApi from "../../api/FilmApi";
import scheduleApi from "../../api/ScheduleApi";
import ticketApi from "../../api/Ticket"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as Icon from 'react-feather';

//util
import daysOfWeek from "../../utils/DaysOfWeek";

//css
import "../../css/general.scss";

//viewschedules


// import { Search } from "react-bootstrap-table2-toolkit";
const Film = (props) => {
  const getListFilm = props.getListFilmAction;
  const history = useHistory();

  useEffect(() => {
    const getAllFilm = async () => {
      const result = await FilmApi.getAllFilm();
      const films = result.content;
      getListFilm(films);
    }
    getAllFilm();
  }, [getListFilm]);

  const data = props.films;
  const [isOpenModal, setOpenModal] = useState(false);
  const [filmname, setFilmname] = useState("");
  const [filmID, setFilmID] = useState(-1);
  const [scheduleMap, setScheduleMap] = useState([]);
  const [time, setTime] = useState("");
  const [quantity, setQuantity] = useState();
  const [scheduleId, setscheduleId] = useState();

  const gotoAddFilm = () => {
    history.push("/films/add");
  }

  const handleCreatTicket = async () => {
    try {
      const ticketObj = {
        quantity: quantity,
        filmScheduleId: scheduleId
      }
      await ticketApi.createTicket(
        ticketObj
      )
    } catch (error) {
      console.log(error)
    }
  }
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  }
  //  console.log(data);
  return (
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Film Page</h1>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h5" className="mb-0">
                <Row >
                  <Col lg="auto">
                    <h3>Film list</h3>
                  </Col>
                  <Col lg={{ offset: 1 }}>
                    <Icon.PlusCircle type="button" onClick={gotoAddFilm}></Icon.PlusCircle>
                  </Col>
                </Row>

              </CardTitle>

            </CardHeader>
            <CardBody>
              <div className="category-products cgv-movies">
                <ul className="products-grid products-grid--max-4-col first last odd">
                  {data.map((film) => (
                    <li className="film-lists item last">
                      <div className="product-images">
                        <a
                          href={`/films/${film.filmId}`}
                          title={film.name}
                          className="product-image"
                        >
                          <img
                            id="product-collection-image-5416"
                            src={film.poster}
                            alt={film.name}
                          />
                        </a>
                      </div>
                      <div
                        className="product-info"
                        style={{ maxHeight: "none", height: "auto", minHeight: 36 }}
                      >
                        <h2 className="product-name">
                          <a
                            href="#"
                            title={film.name}
                          >
                            {film.name}
                          </a>
                        </h2>

                        <div className="cgv-movie-info">
                          <span className="cgv-info-bold">Thể loại: </span>
                          <span className="cgv-info-normal">
                            {film.genre}
                          </span>
                        </div>
                        <div className="cgv-movie-info">
                          <span className="cgv-info-bold">Thời lượng: </span>
                          <span className="cgv-info-normal">{film.duration}</span>
                        </div>


                        <div className="cgv-movie-info">
                          <span className="cgv-info-bold">Khởi chiếu: </span>
                          <span className="cgv-info-normal">{film.releaseDate}</span>
                        </div>
                        <div className="cgv-movie-info">
                          <span className="cgv-info-bold">Giá vé: </span>
                          <span className="cgv-info-normal">{film.ticketPrice} VNĐ</span>
                        </div>
                        <div><Button type='button' color="primary" size="lg" onClick={() => {
                          setOpenModal(true);
                          setFilmname(film.name);
                          setFilmID(film.filmId);
                          console.log(film.filmId, "12312414");

                          scheduleApi.getSchedulesByFilmId(film.filmId)
                            .then((res) => {
                              console.log(res);
                              setScheduleMap(res);
                              Object.assign(scheduleMap, res);
                            })
                            .catch((error) => {
                              console.log(error);
                            })


                        }}>
                          Mua
                        </Button></div>
                      </div>
                    </li>

                  ))
                  }
                </ul>
              </div>

            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={isOpenModal}>

        {/* header */}
        <ModalHeader>
          <h2>{filmID}</h2>
          <p>Chọn lịch chiếu</p>
          <ListGroup horizontal style={{ borderBottom: "1px solid", borderColor: "#002843", borderRadius: 0 }}>

            {Array.from(scheduleMap).map((value) => {

              return (
                <>

                  <ListGroupItem key={value.scheduleId} className="film-infor-schedule-list-item" onClick={() => {
                    setTime(value.timeSlot);
                    setscheduleId(value.scheduleId);
                  }}>
                    <div style={{ display: "grid" }}>
                      <div style={{ fontWeight: "bold", gridRow: 1, gridColumn: 1 }} >
                        {
                          (() => {
                            let d = new Date(value.timeSlot);
                            let day = d.getDay();
                            let date = `${d.getMonth() + 1}/${d.getDate()}`;
                            return `${daysOfWeek[day]} - ${date}`;
                          })()
                        }
                      </div>
                      <div style={{ gridColumn: 1, gridRow: 2 }}>
                        {`No. seat: ${value.seatNumber}`}
                      </div>

                    </div>

                  </ListGroupItem>
                </>
              )
            })}

          </ListGroup>
          <p></p>
        </ModalHeader>

        {/* body */}
        <ModalBody className="m-3">
          <p className="mb-0">
            {`Tên Phim: ${filmname}`}
          </p>
          <p className="mb-0">
            {`Xuất chiếu: ${time}`}
          </p>
          <label htmlFor="">Chọn số vé cần mua   </label>
          <input type="number" name="" id="" onChange={handleQuantity} />
        </ModalBody>

        {/* footer */}
        <ModalFooter>
          <Button color="primary" onClick={handleCreatTicket} >
            Xác nhận
          </Button>{" "}

          <Button color="primary" onClick={() => setOpenModal(false)}>
            Close
          </Button>

        </ModalFooter>
      </Modal>
    </Container>

  )
};
const mapGlobalStateToProps = state => {
  return {
    films: selectFilms(state),
    // page: selectPage(state),
    // size: selectSize(state),
    // totalSize: selectTotalSize(state),
    // selectedRows: selectSelectedRows(state),
  };
};
export default connect(mapGlobalStateToProps, { getListFilmAction })(Film);
