import mamaearth from '../../assets/brandSection/mamaearth.png';
import boat from '../../assets/brandSection/boat.png';
import overview from '../../assets/brandSection/overview.png';
import channel from '../../assets/brandSection/channel.png';
import caretDown from '../../assets/brandSection/caretDown.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import plus from '../../assets/brandSection/plus.png';
import creative from '../../assets/brandSection/creative.png';
import help from '../../assets/brandSection/help.svg';
import Settings from '../../assets/brandSection/Settings.svg';
import './style.scss';

const Sidebar = () => {

    const [show, setShow] = useState(false);

    const getSidebar = () =>{
        return(
            <div className='sidebar_main'>
                <div className='top_sidebar'>
                    <ul className='top_list'>
                        <li>
                            <img src={overview} alt="" />
                            Overview
                        </li>
                        <li className='other_links'>
                            <div className='link'>
                                <div className='content'>
                                    <img src={channel} alt="" />
                                    Channel
                                </div>
                                <img src={caretDown} alt="" className={show ? 'rotate' : ''} onClick={() => setShow(!show)} />
                            </div>
                            {show ? <div className='dropdown_menu'><ul className='sub_menu'>
                                <li>Meta Ads</li>
                                <li>Google Ads</li>
                                <li className='active'>
                                    <Link to="/">Quick Commerce</Link></li>
                            </ul></div> : ''}
                        </li>
                        <li>
                            <img src={creative} alt="" />
                            Creatives
                        </li>
                    </ul>
                </div>
                <div className='bottom_sidebar'>
                    <ul className='top_list'>
                        <li>
                            <img src={help} alt="" />
                            Help
                        </li>

                        <li>
                            <img src={Settings} alt="" />
                            Settings
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className='sidebar_section'>
            <div className='other_brands'>
                <div className='top_logos'>
                    <img src={mamaearth} alt="mamaearth" />
                    <img src={boat} alt="mamaearth" className='boat_logo' />
                    <img src={plus} alt="plus"/>
                </div>
            </div>
            {getSidebar()}
        </div>
    )
}

export default Sidebar;