import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load toys: ${response.status}`);
        }
        return response.json();
      })
      .then((toyData) => setToys(toyData))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(toy) {
    const toyToCreate = { ...toy, likes: 0 };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toyToCreate),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to create toy: ${response.status}`);
        }
        return response.json();
      })
      .then((newToy) => setToys((currentToys) => [...currentToys, newToy]))
      .catch((error) => console.error("Create toy error:", error));
  }

  function handleUpdateToyLikes(id, likes) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update likes: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedToy) =>
        setToys((currentToys) =>
          currentToys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
        )
      )
      .catch((error) => console.error("Update likes error:", error));
  }

  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete toy: ${response.status}`);
        }
        setToys((currentToys) => currentToys.filter((toy) => toy.id !== id));
      })
      .catch((error) => console.error("Delete toy error:", error));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLikeToy={handleUpdateToyLikes}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;
