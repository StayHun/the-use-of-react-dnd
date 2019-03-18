import React, { Component } from 'react';
// import { DragSource, DropTarget } from 'react-dnd';
import PlaceEveryList from './PlaceEveryList';
// import update from 'immutability-helper';
class PlaceList extends Component {
    constructor(props) {
        super(props);
        this.state = { id: this.props.id };
        // this.getOld = this.getOld.bind(this);
        // this.getNew = this.getNew.bind(this);
        this.getPush = this.getPush.bind(this);
        this.getChangeOrder = this.getChangeOrder.bind(this);
    }
    // getOld(old) {
    //     console.log(this.state.id.activities);
    //     this.setState({ old: old });
    // }
    // getNew(news) {
    //     this.setState({ news: news });
    // }
    getPush(old, news) {
        const pushData ={old: old, news: news, indexs: this.props.index};
        if (old !== news) {
            this.props.getChange(pushData);
        }
    }
    getChangeOrder(dragIndex, hoverIndex) {
        // console.log(news);
        // if (news !== this.state.news) {
        //     this.setState({ news: news }, function () {
        //         var id = this.state.id;
        //         if (this.state.old > this.state.news) {
        //             const temp = id.activities[this.state.old];
        //             for (let i = this.state.old; i > this.state.news; i--) {
        //                 id.activities[i] = id.activities[i - 1];
        //             }
        //             id.activities[this.state.news] = temp;
        //         } else {
        //             const temp = id.activities[this.state.old];
        //             for (let i = this.state.old; i < this.state.news; i++) {
        //                 id.activities[i] = id.activities[i + 1];
        //             }
        //             id.activities[this.state.news] = temp;
        //         }
        //         this.setState({ id: id });
        //         console.log(this.state);
        //     });
        // } else {
        //     console.log("tttttttttttttttttt");
        //     console.log(this.props.id);
        //     this.setState({id: this.props.id});
        // }
        // console.log(dragIndex);
        // console.log(hoverIndex);
        // const ids  = this.state.id.activities;
        // const dragCard = ids[dragIndex];
        // console.log(ids);
        // this.setState(
		// 	update(this.state, {
		// 		ids: {
		// 			$splice: [[dragIndex, 1]],
		// 		},
		// 	}),
		// )
    }
    render() {
        // const { id } = this.props;
        // if(id==='Chapter'){
        //     return(
        //         <div style={{ width:'200px', margin: '10px', border: '1px solid black'}}>
        //             {id}
        //             {/* {isDragging && ' (and I am being dragged now)'} */}
        //         </div>
        //     )
        // };
        console.log(this.props);
        return (
            <div>
                <div style={{ width: '200px', margin: '10px', border: '1px solid black' }}>
                    {this.state.id.id}
                    {/* {isDragging && ' (and I am being dragged now)'} */}
                </div>
                {this.state.id.activities.map((item, index) => (<PlaceEveryList getPush={this.getPush} getChangeOrder={this.getChangeOrder} key={index} fatherIndex={this.props.index} index={index} content={item.id} />))}
                {/* <PlaceEveryList content={this.props.id.activities} /> */}
                {/* {id.activities.map((item, index) => (<div key={index} style={{ width:'200px', margin: '10px 10px 10px 40px', border: '1px solid black'}}>{item.id}</div>))} */}

            </div>
        )
    }
}

export default PlaceList;