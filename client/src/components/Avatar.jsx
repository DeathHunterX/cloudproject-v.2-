import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({src, size}) => {
    const { theme } = useSelector(state => state)

    return (
        <div className={size} >
            <img src={src} alt="avatar" className="w-100"
            style={{filter: `${theme ? 'invert(1)' : 'invert(0)'}`}} />
        </div>
    )
}

export default Avatar