import { useEffect, useState } from "react";

const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2412-FTB-ET-WEB-AM";
const API = BASE + COHORT;

export default function App() {
  const [guests, setGuests] = useState([
    {
      id: 1,
      name: "Penny Nickel",
      email: "penny@quarter.com",
      phone: "123-456-7890",
      bio: "oatmeal advocate",
      job: "Global Accounts Engineer",
    },
  ]);

  console.log(guests);

  const getGuests = async () => {
    try {
      const response = await fetch(API + "/guests");
      if (!response.ok) throw Error(":(");
      const result = await response.json();
      setGuests(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getGuests();
  }, []);

  return (
    <>
      <h1>Guest List</h1>
      <GuestList guests={guests} />
    </>
  );
}

function GuestList({ guests }) {
  return (
    <ul className="guests">
      {guests.map((guest) => (
        <GuestListItem key={guest.id} guest={guest} />
      ))}
    </ul>
  );
}

function GuestListItem({ guest }) {
  return (
    <li className="guest">
      <p id="name">{guest.name}</p>
      <p id="email">{guest.email}</p>
      <p id="phone">{guest.phone}</p>
    </li>
  );
}
