import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListCars() {

    const [APIData, setAPIData] = useState([]);

    const getData = () => {
        axios.get(`http://localhost:7000/api/car/getall`)
            .then((response) => {
                setAPIData(response.data);
            })
    }

   useEffect(() => {
        getData();
    }, [])

    const onDelete = (_id) => {
            axios.delete(`http://localhost:7000/api/car/delete/${_id}`)
        .then(() => {
            getData();
        })
    }

  return (
    <div className='add_car_bg'>
        <section className="">
            <h3 className='text-center py-5'>List of Cars for sale</h3>
            <div className="container">
                <div className="row">

                {APIData &&
                    APIData.map((content, index) => (
                        <div className="col-lg-4 col-md-6">
                            <div className="image_content">
                                <figure>
                                    <img src={content.imageUrl} className="img-fluid rounded" alt="" />
                                </figure>
                                <div className="image_content_text">
                                    <h4 className='text-secondary'>Car Brand Name: {content.name}</h4>
                                    <div className='d-flex justify-content-between '>
                                        <div className='image_content_money text-secondary'>Price: <i className="fas fa-hashtag text-primary"></i> {content.amount}</div>
                                        <i className="fas fa-trash-alt text-danger px-3" onClick={() => onDelete(content._id)}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    ))}
                </div>
            </div>
        </section>
    </div>
  )
}

export default ListCars
