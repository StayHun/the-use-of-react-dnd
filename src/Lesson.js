import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const Types = {
    CARD: 'card'
};

const cardSource = {
    beginDrag(props) {
        // Return the data describing the dragged item
        console.log(props); // 该对象里面第二调用的， 然后转向接收器 a2  b2
        props.first(props.title);
        const item = { title: props.title };
        return item;
    },
    canDrag(props, monitor) {
        // console.log("canDrag");
        console.log(props); // 该对象里面最先调用的 a1  b1
        // console.log(monitor);
        // if(props.id==='Chapter'||props.begin){
        //     return true;
        // }
        return true;
    },
    endDrag(props, monitor, component) {
        console.log(props); // 接收器里面的drop结束后调用 a4
        // console.log(monitor);
        // console.log(monitor.getItem());获取beginDrag里面返回的内容
        //   props.move(props.id);
        //props.change();
        if (props.title === 'Chapter' || props.begin) {
            props.move(props.title);
        }
        if (!monitor.didDrop()) {
            return;
        }
    }
};

function collect(connect, monitor) {
    // console.log(connect);
    // console.log(monitor);
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class Lesson extends Component {
    render() {
        // console.log(this.props); 首次刷新会运行5次
        const { title } = this.props;
        const { connectDragSource } = this.props;

        return connectDragSource(
            <div style={{ width: '200px', margin: '10px', border: '1px solid black' }}>
                {title}
                {/* {isDragging && ' (and I am being dragged now)'} */}
            </div>
        );
    }
}

// Export the wrapped version
export default DragSource(Types.CARD, cardSource, collect)(Lesson);