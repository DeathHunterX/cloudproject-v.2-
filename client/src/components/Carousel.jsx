import React from 'react'
import { useSelector } from 'react-redux'

const Carousel = ({images, id}) => {
    const isActive = index => {
        if(index === 0) return "active";
    }
    const { theme } = useSelector(state => state)

    return (
        <div id={`image${id}`} className="carousel slide" data-bs-ride="carousel">
            <ol className="carousel-indicators" style={{zIndex: 1}}>
                {
                    images.map((img, index) => (
                        <li key={index} data-bs-target={`#image${id}`} 
                        data-bs-slide-to={index} className={isActive(index)} />
                    ))
                }
                
            </ol>

            <div className="carousel-inner">
                {
                    images.map((img, index) => (
                        <div key={index} className={`carousel-item ${isActive(index)}`} id="file_img">
                            <img src={img.url} className="d-block w-100" alt={img.url}
                            style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
                        </div>
                    ))
                }
                
            </div>
            
            {
                images.length > 1 &&
                <>
                    <a className="carousel-control-prev" href={`#image${id}`} role="button" data-bs-slide="prev"
                    style={{width: '5%'} }>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        
                    </a>

                    <a className="carousel-control-next" href={`#image${id}`} role="button" data-bs-slide="next"
                    style={{width: '5%'}}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        
                    </a>
                </>
            }
            
        </div>
    )
}

export default Carousel