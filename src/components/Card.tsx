import React from 'react';
import './Card.css';
import { MyCard } from './CardGrid';
export type MyProps = {
    card: MyCard;
};
type MyState = {
    count: number; // like this
};
class Card extends React.Component<MyProps, MyState> {
    state: MyState = {
        // optional second annotation for better type inference
        count: 0,
    };

    render() {
        return (
            <div className="blogcard-d1">
                <img src="https://images.unsplash.com/photo-1494249465471-5655b7878482?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=191559dc1cae3f8967d568dfd8a77093&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb" alt="" />
                <div className="body">

                    <div className="head">
                        <h4 className="heading">{this.props.card.title}</h4>
                        <p className="date">{new Date(this.props.card.created_at).toDateString()}</p>
                    </div>
                    <div className="info">
                        <p>{this.props.card.url}</p>
                    </div>
                    <button className="btn btn-purple" onClick={() => window.open(this.props.card.url)}>More</button>
                </div>
            </div>
        );
    }
}

export default Card;