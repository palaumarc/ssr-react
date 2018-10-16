import React from 'react';
import GamePreview from '../GamePreview';
import renderer from 'react-test-renderer';

it('All props are defined. Snapshot', () => {
    const name = 'dummyName';
    const logoUrl = 'dummyLogoUrl'
    const tree = renderer.create(<GamePreview name={name} logoUrl={logoUrl} />).toJSON();
    expect(tree).toMatchSnapshot();
});