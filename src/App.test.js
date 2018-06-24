import React from 'react';
import ReactDOM from 'react-dom';
import AdviceUmpire from './Components/AdviceUmpire/AdviceUmpire';
import renderer from 'react-test-renderer';

/*
Need to add test the check the assert the output of 'batting' 'bowling' and 'neautral' from adviceumpire
*/

//to do

/*
Test Components*/

describe('AdviceUmpire component renders the AdviceUmpire correctly', () => {
  it('renders correctly', () => {
    const adviceumpire = { associatedWith: "batting"};
    const rendered = renderer.create(
      <AdviceUmpire associated={adviceumpire} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});

/*it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Add />, div);
  ReactDOM.unmountComponentAtNode(div);
});*/

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});
