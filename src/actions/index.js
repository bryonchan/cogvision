const OMDB_API_URL = "https://www.omdbapi.com/";

export const search = (query, params = {page: 1}) => {

	return (dispatch, getState) => {
		let timestamp = Date.now();
		dispatch({
			type: "SEARCH",
			query,
			timestamp,
			params
		});
		if(query){
			return fetch(`${OMDB_API_URL}?s=${query}&page=${params.page}`)
			.then((response) => {
				return response.json();
			})
			.then(json => dispatch({
				type: "RECEIVE_RESULTS",
	    		results: json.Search,
	    		errorMessage:  json.Error,
	    		totalResults: json.totalResults,
	    		page: params.page,
	    		query: query,
	    		timestamp: timestamp
			}))
			.catch( 
			(error) => {
				console.log(error);
			});
		}else{
			return dispatch({
				type: "CLEAR_RESULTS"
			});
		}
		
	};
};

export const sortBy = (sortOrder) => ({
    type: "SORT_BY",
    sortOrder
});

export const goToPage = (number) => {
	return (dispatch, getState) => {
		let state = getState();
		let query = state.results ? state.results.query : null;
		
		return dispatch(search(query, {page: number}));
	};
};

export const getDetails = (id) => {
	return (dispatch, getState) => {
		dispatch({
			type: "GET_DETAILS",
			id,
		});
		if(id){
			return fetch(`${OMDB_API_URL}?i=${id}`)
			.then((response) => {
				return response.json();
			})
			.then(json => dispatch({
				type: "RECEIVE_DETAILS",
	    		details: json,
	    		id
			}))
			.catch( 
			(error) => {
				console.log(error);
			});
		}
		
	};

}