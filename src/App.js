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
    this.state = { place: [], temp: '', status: false, begin: false, order: 0, insideOrder: 0 };
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
      console.log(this.state);
      let place = this.state.place;
      switch (card) {
        case 'Chapter':
          console.log(cards);
          place.push(cards[0]);
          break;
        default:
          if (this.state.place[0]) {
            console.log(this.state);
            const length = this.state.place[this.state.order].activities.length;
            console.log(length);
            place[this.state.order].activities[length] = { id: card };
            console.log(this.state.place[this.state.order].activities);
            const index = { old: place[this.state.order].activities.length - 1, news: this.state.insideOrder, indexs: this.state.order };
            console.log(index);
            if (index.old === 0 || index.news === index.old) {
              console.log("aaa");
            } else {
              this.changeOrder(index);
            }
          }
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
    var num = 0;
    this.setState({ status: true });
    this.state.place.every((item, index) => {
      var insideOrder = parseInt(lesson.y / 33 - index - 1);
      if(index){
        insideOrder = parseInt(lesson.y / 33 - this.state.place[index-1].activities.length - index - 1);
        if(insideOrder<0){
          insideOrder = 0;
        }
      }
      console.log(insideOrder);
      if (insideOrder > this.state.place[index].activities.length - 1) {
        console.log("gggggggggggg");
        insideOrder = this.state.place[index].activities.length;
        console.log(insideOrder);
      }
      num = num + (this.state.place[index].activities.length + 1) * 33;
      if (lesson.y < num) {
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrr");
        this.setState({ order: index, insideOrder: insideOrder }, function () {
          console.log(this.state);
        });
        return false;
      } else {
        this.setState({ insideOrder: insideOrder });
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
    if (index.old > index.news) {
      const temp = data.activities[index.old];
      for (let i = index.old; i > index.news; i--) {
        data.activities[i] = data.activities[i - 1];
      }
      data.activities[index.news] = temp;
    } else {
      const temp = data.activities[index.old];
      for (let i = index.old; i < index.news; i++) {
        data.activities[i] = data.activities[i + 1];
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
