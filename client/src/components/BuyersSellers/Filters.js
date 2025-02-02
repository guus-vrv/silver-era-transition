import React, { useEffect, useState } from 'react';
import axiosInstance from '../Auth/AxiosInstance';
import './styles/Filters.css';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const Filters = () => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [priority, setPriority] = useState('');
  const [value, setValue] = useState(null);
  const [filters, setFilters] = useState([]);
  const [editMode, setEditMode] = useState(false); // edit mode means if the filter is already added, when the user clicks the filter again or clicks edit filter the filter is saved and can be changed
  const role = localStorage.getItem('role');

  const filterOptions = role === 'buyer' ? [
    "Age",
    "Nationality",
    "Generic location",
    "Post Sale Involvement",
    "Timeframe",
    "Type Of Sale",
    "Industry",

    "Sales Volume",
    "Share To Be Transferred",
    "Result",
    "Employees",
    "Profit Margin",
    "Revenue",
    "Cash Flow",

  ] : [ "Age",
    "Nationality",
    "Generic location",
    "Post Sale Involvement",
    "Timeframe",
    "Type Of Sale",
    "Industry"];

  const fetchFilters = async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/api/profiles/filters`);
      setFilters(response.data.filters ? response.data.filters : []);
    }
    catch (err) {
      if (err.response && err.response.status === 404) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    
   fetchFilters();

}, []);




  const handleFilterChange = (event) => {

    setSelectedFilter(event.target.value);
  

    const index = filters.findIndex(f => f.filter === event.target.value); 
  
    if (index !== -1) {
        setEditMode(true);
        setPriority(filters[index].priority);
        setValue(filters[index].value);
    } else {
        setPriority(''); // Reset priority when filter changes
        setValue('');
        setEditMode(false);
    }


  };

  const handlePriorityChange = (level) => {
    if (selectedFilter) {
      setPriority(level);
    } else {
      alert("Please select a filter first!");
    }
  };

  const handleDeleteFilter = async (index) => {

    try {
  
      const filter = filters[index].filter;

      const res = await axiosInstance.post(`${API_URL}/api/profiles/delete-filter`, {
        filter: filter
      });
      fetchFilters();

  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.log(err);
    }
  }

  };

  const handleEditFilter = (e, filter, index) => {
    e.preventDefault();
    setSelectedFilter(filter.filter);
    setPriority(filter.priority);
    setValue(filter.value);
    setEditMode(true);
  }

  const handleAddFilter = async () => {

    if (!selectedFilter) {
      alert("Please select a filter first!");
    }
    else if (!value) {
      alert("Please enter a value first!");
    }
    else if (!priority) {
      alert("Please select a priority first!");
    }

    else
    {
      try {
      
        const res = await axiosInstance.post(`${API_URL}/api/profiles/filter`, {
          filter: selectedFilter, priority, value
        });
  
        setEditMode(false);
        setSelectedFilter("");
        setPriority("");
        setValue("");
        fetchFilters();
  
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log(err);
      }
    }
    }

    

  };

  const renderFilterControl = () => {
    switch (selectedFilter) {
      case "Age":
        return (
          <div>
            <label>Select Age Range:</label>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem'}}>
            <input
              type="number"
              style={{marginBottom: '2rem'}}
              placeholder="Min Age"
              value={value[0]}
              onChange={(e) => {
                setValue([e.target.value, value[1]]);
              }}
            />
            <input
              type="number"
              value={value[1]}
              placeholder="Max Age"
              onChange={(e) => {
                setValue([value[0], e.target.value]);
              }}
            />
            </div>
            
          </div>
        );
  
      case "Nationality":
        return (
          <div>
            <label>Select Nationalities:</label>
            <div className='select'>
            {[
            "American", "Canadian", "French", "German", "Japanese", "Brazilian", "Indian", "British", "Australian", "Chinese", "Dutch", "Italian", "Spanish", "Russian", "South African", "Mexican", "South Korean", "Saudi", "Emirati", "Argentine"
          ].map((nation) => (
              <div key={nation} >
                <label>{nation}</label>
                <input
                  type="checkbox"
                  value={nation}
                  checked={value.includes(nation)}
                  onChange={(e) => {
                    const newValue = value || [];
                    if (e.target.checked) {
                      setValue([...newValue, nation]);
                    } else {
                      setValue(newValue.filter((n) => n !== nation));
                    }
                  }}
                />
                
              </div>
            ))}
            </div>
           
          </div>
        );
  
      case "Generic location":
        return (
          <div>
            <label>Select Locations:</label>
            <div className='select'>
            {[
            "Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen", "Limburg", "Noord-Brabant", 
            "Noord-Holland", "Overijssel", "Utrecht", "Zeeland", "Zuid-Holland"
          ].map((loc) => (
              <div key={loc}>
                <label>{loc}</label>
                <input
                  type="checkbox"
                  checked={value.includes(loc)}
                  value={loc}
                  onChange={(e) => {
                    const newValue = value || [];
                    if (e.target.checked) {
                      setValue([...newValue, loc]);
                    } else {
                      setValue(newValue.filter((location) => location !== loc));
                    }
                  }}
                />
                
              </div>
            ))}
            </div>
           
          </div>
        );
  
      case "Post Sale Involvement":
        return (
          <div>
            <label>Select Involvement Level:</label>
            <div className='select'>
            {["Yes", "No", "Partial"].map((level) => (
              <div key={level}>
                <label>{level}</label>
                <input
                  type="checkbox"
                  value={level}
                  checked={value.includes(level)}
                  onChange={(e) => {
                    const newValue = value || [];
                    if (e.target.checked) {
                      setValue([...newValue, level]);
                    } else {
                      setValue(newValue.filter((l) => l !== level));
                    }
                  }}
                />
                
              </div>
            ))}
            </div>
            
          </div>
        );
  
      case "Timeframe":
        return (
          <div >
            <label>Select Timeframe:</label>
            <div className='select'>
            {["3 months", "6 months", "12 months", "2 years", "3+ years"].map((period) => (
              <div key={period}>
                <label>{period}</label>
                <input
                  type="checkbox"
                  value={period}
                  checked={value.includes(period)}
                  onChange={(e) => {
                    const newValue = value || [];
                    if (e.target.checked) {
                      setValue([...newValue, period]);
                    } else {
                      setValue(newValue.filter((p) => p !== period));
                    }
                  }}
                />
                
              </div>
            ))}
            </div>
            
          </div>
        );
  
      case "Type Of Sale":
        return (
          <div>
            <label>Select Sale Type:</label>
            <div className='select'>
            {["100% Sale", "Majority Stake", "Minority Shareholding"].map((type) => (
              <div key={type} >
                 <label>{type}</label>
                <input
                  type="checkbox"
                  value={type}
                  checked={value.includes(type)}
                  onChange={(e) => {
                    const newValue = value || [];
                    if (e.target.checked) {
                      setValue([...newValue, type]);
                    } else {
                      setValue(newValue.filter((t) => t !== type));
                    }
                  }}
                />
               
              </div>
            ))}
            </div>
            
          </div>
        );
  
      case "Industry":
        return (
          <div>
            <label>Select Industry:</label>
            <div className='select'>
            {[
            "Non-Profit", "Media", "Tech", "Education", "Hospitality", "Energy", 
            "Real Estate", "Retail", "Healthcare", "Manufacturing", "Agriculture"
          ].map((industry) => (
              <div key={industry} >
                <label>{industry}</label>
                <input
                  type="checkbox"
                  value={industry}
                  checked={value.includes(industry)}
                  onChange={(e) => {
                    const newValue = value || [];
                    if (e.target.checked) {
                      setValue([...newValue, industry]);
                    } else {
                      setValue(newValue.filter((i) => i !== industry));
                    }
                  }}
                />
                
              </div>
            ))}
            </div>
            
          </div>
        );

        // start making changes here

       case "Sales Volume":
        return (
          <div>
            <label>Select Sales Volume:</label>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem'}}>
            <input
              type="number"
              style={{marginBottom: '2rem'}}
              placeholder="Min (€)"
              value={value[0]}
              onChange={(e) => {
                setValue([e.target.value, value[1]]);
              }}
            />
            <input
              type="number"
              value={value[1]}
              placeholder="Max (€)"
              onChange={(e) => {
                setValue([value[0], e.target.value]);
              }}
            />
            </div>
            
          </div>
        );

          case "Share To Be Transferred":
            return (
              <div>
                <label>Select Share To Be Transferred:</label>
                <div className='select'>
                          {[ "0-25%", "25-50%", "50-75%", "75-100%" 
                          // code here
                        ].map((shareToBeTransferred) => (
                            <div key={shareToBeTransferred} >
                              <label>{shareToBeTransferred}</label>
                              <input
                                type="checkbox"
                                value={shareToBeTransferred}
                                checked={value.includes(shareToBeTransferred)}
                                onChange={(e) => {
                                  const newValue = value || [];
                                  if (e.target.checked) {
                                    setValue([...newValue, shareToBeTransferred]);
                                  } else {
                                    setValue(newValue.filter((i) => i !== shareToBeTransferred));
                                  }
                                }}
                              />
                              
                            </div>
                          ))}
                          </div>
                
              </div>
            );


            case "Result":
              return (
                <div>
                  <label>Select Result:</label>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem'}}>
                  <input
                    type="number"
                    style={{marginBottom: '2rem'}}
                    placeholder="Min (€)"
                    value={value[0]}
                    onChange={(e) => {
                      setValue([e.target.value, value[1]]);
                    }}
                  />
                  <input
                    type="number"
                    value={value[1]}
                    placeholder="Max (€)"
                    onChange={(e) => {
                      setValue([value[0], e.target.value]);
                    }}
                  />
                  </div>
                  
                </div>
              );
              case "Employees":
                return (
                  <div>
                    <label>Select Employees:</label>
                    <div className='select'>
                    {[ "0-10", "10-100", "100-1000" 
                    // code here
                  ].map((employees) => (
                      <div key={employees} >
                        <label>{employees}</label>
                        <input
                          type="checkbox"
                          value={employees}
                          checked={value.includes(employees)}
                          onChange={(e) => {
                            const newValue = value || [];
                            if (e.target.checked) {
                              setValue([...newValue, employees]);
                            } else {
                              setValue(newValue.filter((i) => i !== employees));
                            }
                          }}
                        />
                        
                      </div>
                    ))}
                    </div>
                    
                  </div>
                );
    

                case "Profit Margin":
                  return (
                    <div>
                      <label>Select Profit Margin:</label>
                      <div className='select'>
                          {[ "0-25%", "25-50%", "50-75%", "75-100%" 
                          // code here
                        ].map((profitMargin) => (
                            <div key={profitMargin} >
                              <label>{profitMargin}</label>
                              <input
                                type="checkbox"
                                value={profitMargin}
                                checked={value.includes(profitMargin)}
                                onChange={(e) => {
                                  const newValue = value || [];
                                  if (e.target.checked) {
                                    setValue([...newValue, profitMargin]);
                                  } else {
                                    setValue(newValue.filter((i) => i !== profitMargin));
                                  }
                                }}
                              />
                              
                            </div>
                          ))}
                          </div>
                      
                    </div>
                  );


                  case "Revenue":
                    return (
                      <div>
                        <label>Select Revenue:</label>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem'}}>
                        <input
                          type="number"
                          style={{marginBottom: '2rem'}}
                          placeholder="Min (€)"
                          value={value[0]}
                          onChange={(e) => {
                            setValue([e.target.value, value[1]]);
                          }}
                        />
                        <input
                          type="number"
                          value={value[1]}
                          placeholder="Max (€)"
                          onChange={(e) => {
                            setValue([value[0], e.target.value]);
                          }}
                        />
                        </div>
                        
                      </div>
                    );
                  
                    case "Cash Flow":
                      return (
                        <div>
                          <label>Select Cash Flow:</label>
                          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem'}}>
                          <input
                            type="number"
                            style={{marginBottom: '2rem'}}
                            placeholder="Min (€)"
                            value={value[0]}
                            onChange={(e) => {
                              setValue([e.target.value, value[1]]);
                            }}
                          />
                          <input
                            type="number"
                            value={value[1]}
                            placeholder="Max (€)"
                            onChange={(e) => {
                              setValue([value[0], e.target.value]);
                            }}
                          />
                          </div>
                          
                        </div>
                      );
  
      default:
        return null;
    }
  };


  return (
    <div>
      <div className="filter-container">
        <div className="filter-left">
          <label htmlFor="filter-select" className="filter-label">Select Filter:</label>
          <select id="filter-select" value={selectedFilter} onChange={handleFilterChange} className="filter-select">
            <option value="">-- Choose a filter --</option>
            {filterOptions.map((filter) => (
              <option key={filter} value={filter}>{filter}</option>
            ))}
          </select>

          {selectedFilter && <div className="filter-content">{renderFilterControl()}</div>}
        </div>

        <div className="filter-right">
          <label htmlFor="filter-select" className="filter-label">Select Priority:</label>
          <div className="button-container">
            <button className={`priority-button low ${priority === 'Low' ? 'selected' : ''}`} onClick={() => handlePriorityChange('Low')}>Low</button>
            <button className={`priority-button low ${priority === 'Medium' ? 'selected' : ''}`} onClick={() => handlePriorityChange('Medium')}>Medium</button>
            <button className={`priority-button low ${priority === 'High' ? 'selected' : ''}`} onClick={() => handlePriorityChange('High')}>High</button>
          </div>

          {editMode ? (<button className="add-filter-btn" style={{backgroundColor: '#424d4b'}} onClick={handleAddFilter}>Save Filter</button>) :(<button className="add-filter-btn" onClick={handleAddFilter}>Add Filter</button>) }

          
        </div>
      </div>


      {filters.map((filter, index) => (
        <div className="current-filter-container">  
            <div className='filter-field'> 
              <label className="filter-label">Filter: </label>
                <div>{filter.filter}</div>
            </div>
            <div className='filter-field'> 
              <label className="filter-label">Priority: </label> 
              <div>{filter.priority}</div>
            </div>
            <div className='filter-field'> 
              <label className="filter-label">Values: </label> 
                {filter.value.map((v, index) => {
                 if (["Sales Volume", "Cashflow", "Result", "Revenue"].includes(filter.filter)) {
                  const formattedValue = `€${Number(v).toLocaleString()}`;
                  if (index == filter.value.length - 1) {
                    return <div>Max: {formattedValue}</div>;
                  } else {
                    return <div>Min: {formattedValue}, </div>;
                  }
                } else if (filter.filter === "Age") {
                  if (index == filter.value.length - 1) {
                    return <div>Max: {v}</div>;
                  } else {
                    return <div>Min: {v}, </div>;
                  }
                }
                  else
                  {
                    if (index == filter.value.length - 1)
                      {
                        return ( <div>{v}</div> )
                      }
                      else{
                        return ( <div>{v}, </div> )
                      }
                  }
                  
                 
              }) }
            </div>
              <button className="add-filter-btn" onClick={(e) => handleEditFilter(e, filter, index)}>Edit Filter</button>

              <button className="delete-filter-btn" style={{color:'red'}} onClick={() => handleDeleteFilter(index)}>Delete Filter</button>
        </div>

      ))}
    

    </div>


  );
};


export default Filters;
