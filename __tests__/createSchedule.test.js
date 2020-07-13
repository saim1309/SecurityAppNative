
import React from 'react';
import CreateSchedule from '../components/Admin/CreateSchedule';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

  it('renders correctly', () => {
    const tree = renderer.create(<CreateSchedule />).toJSON()
    expect(tree).toMatchSnapshot()
});