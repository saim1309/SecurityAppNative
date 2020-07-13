import React from 'react';
import Demo from '../components/demo';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Demo />).toJSON();
  expect(tree).toMatchSnapshot();
});