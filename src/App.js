import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Lesson from './Lesson';
import Place from './Place';
const cards = [{ id: 'Chapter', activities: [] }, { id: 'Content' }, { id: 'Exercise' }, { id: 'Link' }, { id: 'SCORM' }];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { place: [], temp: '', status: false, begin: false, order: 0 };
    this.move = this.move.bind(this);
    this.showStatus = this.showStatus.bind(this);
    // this.change = this.change.bind(this);
    this.first = this.first.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
  }
  /**
   * first函数主要用于实现首次拖拽时只能选择capture
   * 引入temp后传递给接收器，使其能够接收数据
   */
  first(card) {
    this.setState({ temp: card });
  }
  /**
   * 核心数据，主要用于添加数据，注意结束后相关属性复原
   */
  move(card) {
    console.log(this.state);
    const cards = [{ id: 'Chapter', activities: [] }, { id: 'Content' }, { id: 'Exercise' }, { id: 'Link' }, { id: 'SCORM' }];
    if (this.state.status) {
      console.log(card);
      let place = this.state.place;
      switch (card) {
        case 'Chapter':
          console.log(cards);
          place.push(cards[0]);
          break;
        case 'Content':
          console.log(cards[0]);
          place[this.state.order].activities.push(cards[1]);
          break;
        case 'Exercise':
          console.log(cards[0]);
          place[this.state.order].activities.push(cards[2]);
          break;
        case 'Link':
          place[this.state.order].activities.push(cards[3]);
          break;
        case 'SCORM':
          place[this.state.order].activities.push(cards[4]);
          break;
        default:
          console.log(cards);
      }
      console.log(cards);
      console.log(this.state);
      this.setState({ place: place, temp: '', status: false, begin: true, order: this.state.place.length - 1 });
    }
  }

/**
 * 1.表明接收器可以接收数据 2.确定接收数据的具体插入位置
 */
  showStatus(lesson) {
    console.log("status");
    console.log(lesson);
    var num = 0;
    this.setState({ status: true });
    this.state.place.every((item, index) => {
      num = num + (this.state.place[index].activities.length + 1) * 33;
      if (lesson.y < num) {
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrr");
        this.setState({ order: index }, function () {
          console.log(this.state);
        });
        return false;
      } else {
        console.log("sssssssssssssssssssssssssss");
        return true;
      }
    })
  }
  /**
   * 修改接收器里面的课程顺序
   */
  changeOrder(index) {
    console.log(index);
    const datas = this.state.place;
    let data = datas[index.indexs];
    if(index.old>index.news){
      const temp = data.activities[index.old];
      for(let i=index.old; i>index.news; i--){
        data.activities[i]=data.activities[i-1];
      }
      data.activities[index.news] = temp;
    } else {
      const temp = data.activities[index.old];
      for(let i=index.old; i<index.news; i++){
        data.activities[i]=data.activities[i+1];
      }
      data.activities[index.news] = temp;
    }
    this.setState({ place: datas });
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div>{cards.map((item, index) => (<Lesson id={item.id} key={index} move={this.move} first={this.first} begin={this.state.begin} />))}</div>
        <div style={{ height: '350px', width: '400px', border: '1px solid black' }}><Place content={this.state.place} begin={this.state.begin} temp={this.state.temp} changeOrder={this.changeOrder} showStatus={this.showStatus} /></div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
