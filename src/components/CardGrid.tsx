import React from 'react';
import './CardGrid.css';
import Card from './Card';
export interface MyCard {
    title: string;
    url: string;
    created_at: string;
}
export type CardGridProps = {
    cards: MyCard[]
};
type MyState = {};

class CardGrid extends React.Component<CardGridProps, MyState> {
    handleCardClick = (card: MyCard) => {
        alert(`${card.title} clicked!`);
    }
    componentDidMount() {
        console.log(this.props.children);
    }
    private renderCards = () => this.props.cards.map((card, i) => 
    <Card 
    card={card} 
    key={i}
    />);

    render() {
        return (
            <div className="card-grid">
                {
                    this.renderCards()
                }
            </div>
        );
    }
}

export default CardGrid;