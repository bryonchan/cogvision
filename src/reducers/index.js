
const defaultState = {
	results: {
		results: []
	},
	sortOrder: "Title",
	page: 1,
	latestQueryTime: null, // shows the latest query
	isLoading: true,
	details: {}
};

const sortResults = (state, action, rootState) => {
	let sortOrder = action.sortOrder || rootState.sortOrder;
	state.sort((a, b) => {
		return a[sortOrder] > b[sortOrder] ? 1 : a[sortOrder] < b[sortOrder] ? -1 : 0;
	});
	return [...state];
}

const showResults = (state = {}, action, rootState) => {
	let results = action.results || [];

	return {
		...state, 
		results: sortResults(results, action, rootState),
		errorMessage: action.errorMessage,
		totalResults: action.totalResults,
		query: action.query
	};
}

const filmSearch = (state = defaultState, action = {}) => {
    switch (action.type) {
    	case "SEARCH":
    		return {
    			...state,
    			isLoading: true,
    			latestQueryTime: action.timestamp
    		}
        case "RECEIVE_RESULTS":
        	// Sometimes results don't come back in the same order they were searched
        	// Make sure the timestamp matches up
        	if(state.latestQueryTime !== action.timestamp){
        		return state;
        	}
            return {
                ...state,
                results: showResults(state.results, action, state),
                page: action.page,
                isLoading: false
            };
        case "CLEAR_RESULTS":
        	return {
        		...state,
        		results: {
        			results: []
        		},
        		isLoading: false
        	};
        case "SORT_BY":
        	return {
        		...state,
        		results: {
        			...state.results,
        			results: sortResults(state.results.results, action, state)
        		},
        		sortOrder: action.sortOrder
        	};
        case "GO_TO_PAGE":
        	return {
        		...state,
        		page: action.number
        	}
        case "RECEIVE_DETAILS":
        	return {
        		...state,
        		details: {
        			...state.details,
        			[action.id]: {
        				...action.details
        			}
        		}
        	}
        default:
            return state;
    }
};

export default filmSearch;
