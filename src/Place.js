import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PlaceList from './PlaceList';
const Types = {
    CARD: 'card'
};

const chessSquareTarget = {

    hover(props, monitor, component) {
        //   console.log("hover");
        //   console.log(monitor.getDifferenceFromInitialOffset());
        //   this.state({ change: true });
    },
    canDrop(props, monitor, component) {
        //   console.log(props);
        //   console.log(monitor);
        // props.showStatus();
        if (props.begin || props.temp === "Chapter") {
            // props.showStatus();
            return true;
        }
        //   return false;
    },
    drop(props, monitor, component) {
        console.log("drop");
        console.log(props);
        console.log(monitor.getDifferenceFromInitialOffset());
        console.log(monitor.getClientOffset());
        props.showStatus(monitor.getClientOffset());
        if (monitor.didDrop()) {
            return;
        }
        return { moved: true };
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    };
}

class Place extends Component {
    //   componentDidUpdate(prevProps) {
    //     if (!prevProps.isOver && this.props.isOver) {
    //       // You can use this as enter handler
    //     }

    //     if (prevProps.isOver && !this.props.isOver) {
    //       // You can use this as leave handler
    //     }

    //     if (prevProps.isOverCurrent && !this.props.isOverCurrent) {
    //       // You can be more specific and track enter/leave
    //       // shallowly, not including nested targets
    //     }
    //   }
    constructor(props) {
        super(props);
        this.state = { change: false };
        this.getChange = this.getChange.bind(this);
    }
    getChange(index) {
        console.log("000000000000000000000000");
        console.log(index);
        this.props.changeOrder(index);
    }
    render() {
        // console.log(this.props);
        const { connectDropTarget, content } = this.props;
        // console.log(this.state.change);
        return connectDropTarget(
            <div style={{ height: '350px', maxHeight: '350px', width: '400px', overflow: 'auto' }}>
                {content.map((item, index) => (<PlaceList id={item} getChange={this.getChange} key={index} index={index} />))}
                {/* <PlaceList /> */}
            </div>
        );
    }
}

export default DropTarget(Types.CARD, chessSquareTarget, collect)(Place);