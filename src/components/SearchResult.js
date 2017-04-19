import React, { PropTypes } from 'react';
import {Row, Col} from 'react-bootstrap';

const SearchResult = ({ className, result, onGetDetails, details }) => {
    
    let detailsList; 

    if(details){
    	detailsList = Object.keys(details).map((key) => {
	    	if(typeof details[key] === 'string' ){
	    		return <li key={key}>{key}: {details[key]}</li>
	    	}
	    	return null;
	    });	
    }
    
    return (
		
	    	<details className="film-list-result">
	        	<summary>
	        		{result.Title}  ({result.Year})
	        	</summary>
	        	<Row>
				<Col sm={3}>
					{result.Poster !== "N/A" &&
			    		<img alt={result.Title} src={result.Poster} />
			    	}
				</Col>
				<Col sm={9}>
		    		{!details &&
			    		<a onClick={onGetDetails}>Show details</a>
			    	}
		    		{details &&
		    			<ul className="details">{detailsList}</ul>
		    		}
		    	</Col>
		    	</Row>
	    	</details>
    	
        	
    );
};

SearchResult.displayName = 'SearchResult';

SearchResult.propTypes = {
    className: PropTypes.string,
};

export default SearchResult;
