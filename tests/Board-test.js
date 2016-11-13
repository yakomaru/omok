import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Board from '../components/Board.js';
import Grid from '../components/Grid.js';

describe("Board component test", () => {
  it("contains 361 Grids", () => {
    expect(mount(<Board />).find('.grid').length).to.equal(361);
  });
})
