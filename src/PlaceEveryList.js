import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

class PlaceEveryList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { content, isDragging, connectDropTarget, connectDragSource } = this.props;
        const opacity = isDragging ? 0 : 1
        // if(id==='Chapter'){
        //     return(
        //         <div style={{ width:'200px', margin: '10px', border: '1px solid black'}}>
        //             {id}
        //             {/* {isDragging && ' (and I am being dragged now)'} */}
        //         </div>
        //     )
        // };
        console.log(this.props);
        return connectDropTarget(
            connectDragSource(
                <div style={{ width: '200px', margin: '10px 10px 10px 40px', border: '1px solid black' , opacity}}>
                    {content}
                </div>
            )
        )
    }
}
var head;
var now;
const source = {
    beginDrag(props) {
        console.log(props.fatherIndex);
        head = props.fatherIndex;
        // props.getOld(props.index);
        return {
            id: props.index
        };
    },

    // isDragging(props, monitor) {
    //   return props.id == monitor.getItem().id;
    // }
};

const target = {
    hover(props, monitor, component) {
        // props.getOld(monitor.getItem().id);
        // props.getNew(props.index);
        // props.getChangeOrder(monitor.getItem().id, props.index);
    },
    canDrop(props, monitor) {
        now = props.fatherIndex;
        if (head === now) {
            return true;
        }
    },

    drop(props, monitor, component) {
        // now=props.fatherIndex;
        props.getPush(monitor.getItem().id, props.index);
        console.log(props.fatherIndex);
    }
};

const TYPE = 'ITEM';
const Item = DropTarget(TYPE, target, connect => ({
    connectDropTarget: connect.dropTarget()
}))(
    DragSource(TYPE, source, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }))(PlaceEveryList)
);

export default Item;