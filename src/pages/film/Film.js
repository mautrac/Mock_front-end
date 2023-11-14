import React, { useEffect } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row
} from "reactstrap";
import { connect } from "react-redux";
import { selectFilms } from "../../redux/selectors/FilmSelector";
// import paginationFactory from "react-bootstrap-table2-paginator";
import { getListFilmAction } from "../../redux/actions/FilmActions";
import '../../css/film.css'
import FilmApi from "../../api/FilmApi"
const Film = (props) => {
  const getListFilm = props.getListFilmAction;
  useEffect(() =>{
    const getAllFilm = async() =>{
      const result = await FilmApi.getAllFilm();
      const films = result.content;
      getListFilm(films);
    }
    getAllFilm(); 
  },[getListFilm]);

 const data = props.films;
//  console.log(data);
  return(
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Film Page</h1>
    <Row>
      <Col> 
        <Card>
          <CardHeader>
            <CardTitle tag="h5" className="mb-0">Danh sách phim</CardTitle>
          </CardHeader>
          <CardBody>
          <div className="category-products cgv-movies">
          <ul className="products-grid products-grid--max-4-col first last odd">
           {data.map((film)=>(
                <li className="film-lists item last">
                     <div className="product-images">
                        <a
                           href="#"
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
              style={{ maxHeight: "none", height: 121, minHeight: 36 }}
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
                <span className="cgv-info-bold">Đạo diễn: </span>
                <span className="cgv-info-normal">{film.directors}</span>
              </div>
              <div className="cgv-movie-info">
                <span className="cgv-info-bold">Diễn viên: </span>
                <span className="cgv-info-normal">{film.actors}</span>
              </div>
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
                <span className="cgv-info-bold">Mô tả: </span>
                <span className="cgv-info-normal">{film.description}</span>
              </div>
              <div className="cgv-movie-info">
                <span className="cgv-info-bold">Khởi chiếu: </span>
                <span className="cgv-info-normal">{film.releaseDate}</span>
              </div>
              <div className="cgv-movie-info">
              <span className="cgv-info-bold">Giá vé: </span>
              <span className="cgv-info-normal">{film.ticketPrice} VNĐ</span>
            </div>
                    </div>
                </li>

           ))}
          </ul>
        </div>
        
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
)};
const mapGlobalStateToProps = state => {
  return {
    films: selectFilms(state),
    // page: selectPage(state),
    // size: selectSize(state),
    // totalSize: selectTotalSize(state),
    // selectedRows: selectSelectedRows(state),
  };
};
export default connect(mapGlobalStateToProps,{getListFilmAction})(Film);
