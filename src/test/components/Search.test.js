import React from 'react';
import { shallow } from 'enzyme';
import Search from '../../components/Search';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";


const mockStore = configureMockStore();
var store, container, wrapper;


describe("Search Component", () => {
    beforeEach(() => {
        store = mockStore({
            "searchText": "divyavontimitta"
        });
        wrapper = shallow(
            <Provider store={store}>
                <Search />
            </Provider>
        );
        container = shallow(<Search store={store} />)
    })
    it("should render without throwing an error", () => {
        expect(container.length).toEqual(1)
    });
    test('TextField component should exist', () => {
        expect(wrapper.find('TextField')).toBeDefined();
    });
    it('check Prop matches with initialState on load of the application', () => {
        expect(container.prop('searchText')).toEqual("divyavontimitta")
    });
    

});




