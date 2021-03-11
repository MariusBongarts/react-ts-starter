import React from 'react';
import './CardGrid.css';
import Card from './Card';
import { CardContext } from '../contexts/CardContext';
export interface MyCard {
    title: string;
    url: string;
    created_at: string;
}
export type CardGridProps = {
};
type MyState = {};

class CardGrid extends React.Component<CardGridProps, MyState> {
    handleCardClick = (card: MyCard) => {
        alert(`${card.title} clicked!`);
    }

    render() {
        return (
            <div className="card-grid">
                <CardContext.Consumer>
                    {
                        context => context.cards.map((card, i) =>
                            <Card
                                card={card}
                                key={i}
                            />)
                    }
                </CardContext.Consumer>
            </div>
        );
    }
}

export default CardGrid;