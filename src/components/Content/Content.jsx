import React from "react";
import Card from "../common/ListCard/ListCard";
import navCards from "@/constants/navCards_NewUser";
import navCardsLoggedIn from "@/constants/navCards_LoggedInUser";
const Content = ({ onClick }) => {
  const login_token = JSON.parse(localStorage.getItem("login_token"));
  return (
    <div className="py-6 px-5 flex flex-col gap-2">
      {(login_token ? navCardsLoggedIn : navCards)?.map((card, index) => (
        <Card
          key={index}
          callback={onClick}
          icon={card.icon}
          route={card.route}
          job={{ job_title: card.title }}
          externalRedirect={card.externalRedirect || false}
        ></Card>
      ))}
    </div>
  );
};

export default Content;
