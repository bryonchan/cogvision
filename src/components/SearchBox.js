import React, { PropTypes } from 'react';
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap';

        // <input {...props} />
const SearchBox = ({...props}) => {
    return (
    	<FormGroup
          controlId="formBasicText"
          validationState={props.errorMessage ? "error" : null}
        >
	        <FormControl
	            type="text"
	            placeholder={props.placeholder}
	            onChange={props.onChange}
	          />
	          {props.errorMessage && 
		          <HelpBlock>{props.errorMessage}</HelpBlock>
		      }
		      {props.totalNumberOfResults && 
		          <HelpBlock>Total found: {props.totalNumberOfResults}</HelpBlock>
		      }
        </FormGroup>
    );
};

SearchBox.displayName = 'SearchBox';

SearchBox.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
};

export default SearchBox;
