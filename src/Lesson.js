import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const Types = {
    CARD: 'card'
};

const cardSource = {
    beginDrag(props) {
        // Return the data describing the dragged item
        console.log(props);
        props.first(props.id);
        const item = { id: props.id };
        return item;
    },
    canDrag(props, monitor) {
        console.log("canDrag");
        console.log(props);
        console.log(monitor);
        // if(props.id==='Chapter'||props.begin){
        //     return true;
        // }
        return true;
    },
    endDrag(props, monitor, component) {
        console.log(props);
        console.log(monitor);
        console.log(monitor.getItem());
        //   props.move(props.id);
        //props.change();
        if (props.id === 'Chapter' || props.begin) {
            console.log("aaa----------------");
            props.move(props.id);
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
        const { id } = this.props;
        const { connectDragSource } = this.props;

        return connectDragSource(
            <div style={{ width: '200px', margin: '10px', border: '1px solid black' }}>
                {id}
                {/* {isDragging && ' (and I am being dragged now)'} */}
            </div>
        );
    }
}

// Export the wrapped version
export default DragSource(Types.CARD, cardSource, collect)(Lesson);