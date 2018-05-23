import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import App from '../../App';


import configureStore from "redux-mock-store";
import { shallow, mount, render } from 'enzyme';
import Search from '../../components/Search';
import Results from '../../components/Results';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store()}>
    <App />
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div); 
});
//*******************************************************************************************************
describe('>>>H O M E --- REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    itemsPerPage: 25,
    owner: "divyavontimitta"
  }

  const mockStore = configureStore()
  let store, wrapper, container;

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = shallow(<Provider store={store}><App /></Provider>)
    container = shallow(<App store={store} />)
  })
  it('+++ contains header - h2', () => {
    debugger;
    expect(wrapper.exists(<h1>React App to talk to Github</h1>)).toBe(true)
  });
  it('+++ render the connected(Search) component', () => {
    expect(wrapper.exists(Search)).toBe(true)
  });
  it('+++ render the connected(Results) component', () => {
    expect(wrapper.exists(Results)).toBe(true)
  });
});