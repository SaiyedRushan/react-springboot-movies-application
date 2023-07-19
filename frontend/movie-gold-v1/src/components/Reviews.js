import { useEffect, useRef } from "react";
import api from "../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "./ReviewForm";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current;

    try {
      const res = await api.post(`/api/v1/reviews`, {
        reviewBody: rev.value,
        imdbId: movieId,
      });

      const updatedReviews = [...reviews, { body: rev.value }];
      setReviews(updatedReviews);
      rev.value = "";
      alert("Review added successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="p-5">
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="py-2" xs={1} sm={"2"}>
        <Col>
          <img src={movie?.poster} alt="" width={"100%"} />
        </Col>
        <Col className="py-3">
          <Row>
            <Col>
              <ReviewForm
                handleSubmit={addReview}
                revText={revText}
                labelText="Write a review"
              />
            </Col>
          </Row>

          {reviews?.map((review, index) => {
            return (
              <>
                <Row className="pt-4" key={index}>
                  <Col>
                    {review.body}
                    <hr />
                  </Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
