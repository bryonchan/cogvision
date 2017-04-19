import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {search, goToPage} from '../../actions'
import filmSearch from '../../reducers'
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe('Film Search', () => {
  afterEach(() => {
    fetchMock.reset();
  })

	it('should do a search', () => {
		fetchMock.get('*', { 
			Search: [
				{
					Title: "As Good as it gets"
				}
			]
		})

		const store = mockStore({ todos: [] });

		return store.dispatch(search("asd"))
	    .then(() => { // return of async actions
	        expect(store.getActions()[0]).toMatchObject({ type: "SEARCH" })
	        expect(store.getActions()[1]).toMatchObject({ type: "RECEIVE_RESULTS", query: "asd" });
	    })
	});

	it('should do a search passing the previous query with new page number', () => {
		fetchMock.get('*', { 
			Search: [
				{
					Title: "As Good as it gets"
				}
			]
		})

		const store = mockStore({page: 3, results: {query: 'bla'}});

		return store.dispatch(goToPage(2))
	    .then(() => { // return of async actions
	        expect(store.getActions()[0]).toMatchObject({ type: "SEARCH", query: 'bla' })
	        expect(store.getActions()[1]).toMatchObject({ type: "RECEIVE_RESULTS" })
	        
	    })
	});

	describe('Film Reducer', () => {
	    it('should update page', () => {
	        let state = filmSearch(undefined, {page: 3, type: "RECEIVE_RESULTS", query: "asd", timestamp: null})
	        expect(state.page).toEqual(3);
	        expect(state.results.query).toEqual("asd");
	    });

	    it('should only show ones matching the latest timestamp', () => {
	        let state = filmSearch(undefined, {page: 1, type: "SEARCH", query: "tota", timestamp: 1234});
	        state = filmSearch(state, {page: 1, type: "SEARCH", query: "total", timestamp: 2215});
	        state = filmSearch(state, {page: 1, type: "RECEIVE_RESULTS", query: "total", timestamp: 2215});
	        state = filmSearch(state, {page: 1, type: "RECEIVE_RESULTS", query: "tota", timestamp: 1234});

	        expect(state.page).toEqual(1);
	        expect(state.latestQueryTime).toEqual(2215);
	        expect(state.results.query).toEqual("total");
	    });
	});

})