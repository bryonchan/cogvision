import React, { PropTypes } from 'react';
import {Radio, FormGroup, ControlLabel, Glyphicon, OverlayTrigger, Popover} from 'react-bootstrap';

const SortComponent = ({ className, value, onChange }) => {
	const popoverLeft = (
	  <Popover id="popover-positioned-left">
	    <strong>Only the visible results are sorted due to API restrictions</strong>
	  </Popover>
	);
    return (
        <FormGroup>
        	<OverlayTrigger rootClose trigger="click" placement="bottom" overlay={popoverLeft}>
        		<ControlLabel>Sort&nbsp;<Glyphicon glyph="warning-sign" />:&nbsp;</ControlLabel>
        	</OverlayTrigger>
			<Radio inline value="Title" checked={value === "Title"} onChange={onChange.bind(this, "Title")}>
				Title
			</Radio>
			<Radio inline value="Year" checked={value === "Year"} onChange={onChange.bind(this, "Year")}>
				Year
			</Radio>
	    </FormGroup>
    );
};

SortComponent.displayName = 'SortComponent';

SortComponent.propTypes = {
    className: PropTypes.string,
};

export default SortComponent;
