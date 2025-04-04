
import DatePicker from 'react-datepicker';
import dateIcon from '../../assets/brandSection/dateIcon.svg';
import dateDropdown from '../../assets/brandSection/dateDropdown.svg';

import './style.scss';

const QuickHeader = ({startDate, endDate, setStartDate, setEndDate}) =>{
    return(
        <div className="quick_header">
            Quick Commerce
            <div className='date_section'>
                <img src={dateIcon} alt=""/>
            <DatePicker
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)} 
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="MMM dd, yyyy"
                    />
                    <span> - </span>
                    <DatePicker 
                        selected={endDate} 
                        onChange={(date) => setEndDate(date)} 
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="MMM dd, yyyy"
                    />
                    <img src={dateDropdown} alt=""/>
            </div>
        </div>
    )
}

export default QuickHeader;