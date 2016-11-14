import React from 'react';
import ReactTestUtils from 'react-addons-test-utils'
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import Board from '../components/Board.js';
import Grid from '../components/Grid.js';

describe("Board component test", () => {
  it("contains 361 Grids", () => {
    expect(mount(<Board />).find('.grid').length).to.equal(225);
  });
  it("should call changeCoordinateState on click", () => {
    sinon.spy(Board.prototype, 'changeCoordinateState');
    const wrapper = mount(<Board />);
    wrapper.find('.grid').at(0).simulate('click');
    expect(Board.prototype.changeCoordinateState.calledOnce).to.equal(true);
    Board.prototype.changeCoordinateState.restore();
  });
  it("should call checkVictoryCondition at the 9th turn", () => {
    sinon.spy(Board.prototype, 'checkVictoryCondition');
    const wrapper = mount(<Board />);
    for (let i = 0; i < 9; i++) {
      wrapper.find('.grid').at(i).simulate('click');
    }
    expect(Board.prototype.checkVictoryCondition.calledOnce).to.equal(true);
    Board.prototype.checkVictoryCondition.restore();
  });
  it("should not call changeCoordinateState twice when clicking on the same coordinate twice", () => {
    sinon.spy(Board.prototype, 'changeCoordinateState');
    const wrapper = mount(<Board />);
    wrapper.find('#1,1').simulate('click');
    wrapper.find('#1,1').simulate('click');
    expect(Board.prototype.changeCoordinateState.calledOnce).to.equal(true);
    Board.prototype.changeCoordinateState.restore();
  });
  it("should change victory text when there is a five in a row horizontally", () => {
    const wrapper = mount(<Board />);
    wrapper.find('#0,0').simulate('click');
    wrapper.find('#2,10').simulate('click');
    wrapper.find('#0,2').simulate('click');
    wrapper.find('#3,3').simulate('click');
    wrapper.find('#0,1').simulate('click');
    wrapper.find('#4,5').simulate('click');
    wrapper.find('#0,3').simulate('click');
    wrapper.find('#0,10').simulate('click');
    wrapper.find('#0,4').simulate('click');
    expect(wrapper.find('.victory-message').text()).to.equal('Player 1 has won');
  });
  it("should change victory text when there is a five in a row vertically", () => {
    const wrapper = mount(<Board />);
    wrapper.find('#0,0').simulate('click');
    wrapper.find('#14,14').simulate('click');
    wrapper.find('#1,0').simulate('click');
    wrapper.find('#12,12').simulate('click');
    wrapper.find('#3,0').simulate('click');
    wrapper.find('#10,5').simulate('click');
    wrapper.find('#4,0').simulate('click');
    wrapper.find('#9,2').simulate('click');
    wrapper.find('#2,0').simulate('click');
    expect(wrapper.find('.victory-message').text()).to.equal('Player 1 has won');
  });
  it("should change victory text when there is a five in a row major diagonally", () => {
    const wrapper = mount(<Board />);
    wrapper.find('#9,1').simulate('click');
    wrapper.find('#0,0').simulate('click');
    wrapper.find('#2,5').simulate('click');
    wrapper.find('#1,1').simulate('click');
    wrapper.find('#9,5').simulate('click');
    wrapper.find('#2,2').simulate('click');
    wrapper.find('#11,5').simulate('click');
    wrapper.find('#4,4').simulate('click');
    wrapper.find('#12,10').simulate('click');
    wrapper.find('#3,3').simulate('click');
    expect(wrapper.find('.victory-message').text()).to.equal('Player 2 has won');
  });
  it("should change victory text when there is a five in a row minor diagonally", () => {
    const wrapper = mount(<Board />);
    wrapper.find('#1,5').simulate('click');
    wrapper.find('#4,0').simulate('click');
    wrapper.find('#2,10').simulate('click');
    wrapper.find('#3,1').simulate('click');
    wrapper.find('#8,5').simulate('click');
    wrapper.find('#0,4').simulate('click');
    wrapper.find('#5,4').simulate('click');
    wrapper.find('#1,3').simulate('click');
    wrapper.find('#9,9').simulate('click');
    wrapper.find('#2,2').simulate('click');
    expect(wrapper.find('.victory-message').text()).to.equal('Player 2 has won');
  });
})
