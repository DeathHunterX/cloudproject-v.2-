import React from 'react'
import Packdes from '../../images/HomePage/packdes.png'
import Logodes from '../../images/HomePage/logodes.png'
import Wordp from '../../images/HomePage/wordp.png'
import Mobi from '../../images/HomePage/mobi.png'

const HomePage3 = () => {
    return (
        <div className='best3'>
            <h1>Make it Real with Helper.</h1>
            <h4>Get some inspirations from 1800+ skills</h4>
        <div className='boxcon3'>
            <div className='container'>
            <img className='icon2' src={Logodes} alt="Logodes" />
                <h3>Logo Design.</h3>
                <h3>$30 USD in 1 day.</h3>
            </div>

            <div className='container'>
            <img className='icon2' src={Packdes} alt="Packdes" />
                <h3>Package Design.</h3>
                <h3>$280 USD in 4 day.</h3>
            </div>

            <div className='container'>
            <img className='icon2' src={Mobi} alt="Mobi" />
                <h3>Mobile Design.</h3>
                <h3>$680 USD in 4 days.</h3>
            </div>

            <div className='container'>
            <img className='icon2' src={Wordp} alt="Wordp" />
                <h3>WordPress.</h3>
                <h3>$45 USD in 1 day.</h3>
            </div>
            
            </div>

            

        <hr/>
        </div>
    )
}

export default HomePage3
