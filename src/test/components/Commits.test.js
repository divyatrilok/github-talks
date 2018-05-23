import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Commits from '../../components/Commits';

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });


describe("Commits Component", () => {
    it("should render without throwing an error", () => {
        expect(
            shallow(
                <Provider store={store}>
                    <Commits />
                </Provider>
            ).exists(<h1>Test page</h1>)
        ).toBe(true);
    });
});