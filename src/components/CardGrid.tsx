import React from 'react';
import './CardGrid.css';
import Card from './Card';
export interface MyCard {
    title: string;
}
export type CardGridProps = {
    cards: MyCard[]
};
type MyState = {};

class CardGrid extends React.Component<CardGridProps, MyState> {
    handleCardClick = (card: MyCard) => {
        alert(`${card.title} clicked!`);
    }
    private renderCards = () => this.props.cards.map(card => 
    <Card 
    handleCardClick={this.handleCardClick}
    card={card} />)
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