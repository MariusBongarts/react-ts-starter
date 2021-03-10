import React from "react";
import { MyCard } from "../components/CardGrid";

interface ICardCOntext {
    cards: MyCard[]
}

export const CardContext = React.createContext<ICardCOntext>({ cards: [{ created_at: "", title: "ojsdpo", url: "adsoj" }] });

// export const CardProvider = ({
//     cards,
//     children,
// }: {
//     cards: MyCard[];
//     children: React.ReactNode;
// }) => {
//     return (
//         <CardContext.Provider value={{ cards }}>
//             {children}
//         </CardContext.Provider>
//     );
// };