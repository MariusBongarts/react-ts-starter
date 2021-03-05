import React from 'react';
import './CardGrid.css';
import Card from './Card';
export type CardGridProps = {
};
type MyState = {
    count: number; // like this
};
class CardGrid extends React.Component<CardGridProps, MyState> {
    state: MyState = {
        // optional second annotation for better type inference
        count: 0,
    };
    render() {
        return (
            <div className="card-grid">
                <Card title={"Hallo"}/>
                <Card title={"Zweite"}/>
            </div>
        );
    }
}

export default CardGrid;