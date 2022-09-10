import React, { useState } from 'react'
import { Rating, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { ratingPost } from '../../redux/actions/ratingAction';

const RatingPost = ({setOnRating, job, auth}) => {
    // const [rating, setRating] = useState(0);

    const initialState = {postId: job.postId._id, rating: 0}
    const [ratingData, setRatingData] = useState(initialState)
    const {rating} = ratingData
    const dispatch = useDispatch()
    
    const handleSubmitRating = ()  =>  {
        // console.log(ratingData)
        dispatch(ratingPost(ratingData, auth))
        setOnRating(false)
    }

    return (
        <div className="rating-container">
            <div className="rating-box">
                <div>
                    <div className="star-rating">
                        <Rating
                        name="simple-controlled"
                        // style={{ marginBottom: "30px" }}
                        value={rating === -1 ? null : rating}
                        onChange={(e, newValue) => {
                        setRatingData({...ratingData, rating: newValue});
                        }}
                        
                    />
                    </div>
                    
                    <div className="rating-button">
                        <Button
                        variant="contained"
                        color="primary"
                        style={{ padding: "10px 50px" }}
                        onClick={() => handleSubmitRating()}
                        >Submit</Button>
                    </div>
                </div>
                
                

                <button className="btn btn-danger btn_close"
                onClick={() => setOnRating(false)}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default RatingPost