import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SearchByDate } from './stay-filter-search-dates'
import { AddGuestsFilter } from './stay-filter-addGuest-filter'
import { setFilterBy } from '../store/action/stay.action.js'

import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux'
import { useLocation } from "react-router-dom";

export const StayFilter = () => {

  const [isFilterExpand, setFilterExpand] = useState(false)
  const [currExpand, setExpand] = useState(null)
  const [filterBy, setFilterBy] = useState({})
  const dispatch = useDispatch()
  let navigate = useNavigate()
  let location = useLocation();

  const onChangeFilter = (ev) => {
    ev.preventDefault()
    setFilterBy({ ...filterBy, txt: ev.target.value })
  }

  const onSetFilter = () => {
    dispatch(setFilterBy(filterBy))
    navigate('/stays')
  }
  
  useEffect(()=>{
    //close filter expand when moveing to another page
    setFilterExpand(false)
    if(location.pathname === '/' ){    
      document.querySelector('.main-container').addEventListener('click', () => {
      setFilterExpand(false)
    })}
    return ()=>{
      document.removeEventListener('click',setFilterExpand)
    }
  },[location])
  
  console.log(filterBy)
  return (<section className="app-filter-container">
    <div className="app-filter">
      <div className='filter-btn-container filter-btn-location' onClick={() => {
        setFilterExpand(!isFilterExpand)
        setExpand('Anywhere')
      }}>
        <div className="filter-btn" >
          {currExpand === 'Anywhere' && isFilterExpand ?
         
            <div>
              Where
              <form>
                <input className="destination-input" type="text"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(event) => { onChangeFilter(event) }}
                  placeholder='search destination' />
              </form>
            </div>
            : filterBy.txt || filterBy.region && <div> Where <p>{filterBy.txt||filterBy.region  }</p> </div> ||'Anywhere'
            }
        </div>
      </div>
      <span className="filter-span"></span>
      <div className='filter-btn-container filter-btn-dates' onClick={() => {
        setFilterExpand(!isFilterExpand)
        setExpand('Any week')
      }}>
        <div className="filter-btn" >
          {currExpand === 'Any week' && isFilterExpand ?
            <div>
              <p>When</p>
              <p>Any week</p>
            </div>
            : filterBy.startDate&&filterBy.endDate && <div className="check-in-container"><div className=" check"> <p>Check in</p> {filterBy.startDate}</div><div className=" check"><p>Check out</p>{filterBy.endDate} </div> </div> || 'Any week' }
        </div>
      </div>
      <span className="filter-span"></span>
      <div className='filter-btn-container filter-btn-guests' >
        <div className="filter-btn" onClick={() => {
          setFilterExpand(!isFilterExpand)
          setExpand('Add guests')
        }}>
          {currExpand === 'Add guests' && isFilterExpand ?
            <div>
              <p>Who</p>
              <p>Add guests</p>
            </div>
            :filterBy.guestsNumber && <p>{filterBy.guestsNumber} guests</p> || <p className="add-guests-paragraph">Add guests</p>}
        </div>
        <div className="search">
          <div className="search-icon" onClick={() => onSetFilter()}><SearchIcon className="search-icon-svg"  /></div>
        </div>
      </div>
    </div>
    {isFilterExpand && <div className="filter-expand">
      {currExpand === 'Anywhere' && <div>
        <SearchByDestination setRegionFilter={(region) => setFilterBy({ ...filterBy, region })} />
      </div>}
      {currExpand === 'Any week' && <div>
        <SearchByDate onSetDates={(start, end) => setFilterBy({ ...filterBy, startDate: `${start.getDate()}/${start.getMonth() + 1}`, endDate: `${end.getDate()}/${end.getMonth() + 1}` })} />
      </div>}
      {currExpand === 'Add guests' && <div>
        <AddGuestsFilter setGuests={(guests) => setFilterBy({ ...filterBy, guestsNumber: guests })} />
      </div>}
    </div>}
  </section>
  )
}


function SearchByDestination(props) {
  const [region, setRegion] = useState('')
  useEffect(() => {
    if (region === '') return
    props.setRegionFilter(region)
  }, [region])
  return <div className="destination-search-container">
    <h4 className="destination-search-container-header">search by region</h4>
    <div className="regions-container">
      <Destination  region={'Spain'} setRegion={setRegion} />
      <Destination  region={'United States'} setRegion={setRegion} />
      <Destination  region={'Canada'} setRegion={setRegion} />
      <Destination  region={'France'} setRegion={setRegion} />
      <Destination  region={'Brazil'} setRegion={setRegion} />
      <Destination  region={'Italy'} setRegion={setRegion} />
    </div>
  </div>
}
function Destination(props) {
  return <div className="region-image-container" onClick={() => props.setRegion(props.region)}>
    <img src={require('../assets/img/filter/world.jpg')} alt="" className="region-image" />
    <p>{props.region}</p>
  </div>
}

