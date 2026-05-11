# Practice Challenge: Toy Tales

You've got a friend in need! Again!

Andy has misplaced his toys (again) and needs your help to organize them.

## Setup

All the information about Andy's toys can be found in the `db.json` file. We'll
be using `json-server` to create a RESTful API for our database.

Run `npm install` to install dependencies.

Then, run `npm run server` to start `json-server` on `http://localhost:3001`.

In another tab, run `npm run dev` to start the React app at `http://localhost:3000`.

In another tab, run `npm run test` to run the test suite.

## Functionality

This application now connects the frontend to the backend via fetch requests.

- Loads all toys from `http://localhost:3001/toys` on page load.
- Creates a new toy through a POST request when the toy form is submitted.
- Increments likes with a PATCH request to `/toys/:id`.
- Deletes a toy with a DELETE request to `/toys/:id`.

## Code Organization

- `src/components/App.jsx` stores the toy array and handles data loading, toy
  creation, liking, and deletion.
- `src/components/ToyForm.jsx` is a controlled form that passes new toy input up
  to the parent component.
- `src/components/ToyContainer.jsx` renders the list of toys.
- `src/components/ToyCard.jsx` renders each toy and wires the like/delete actions.

## Notes

- The form uses local state for the toy name and image, then posts the new toy to
  the server and appends it to the UI.
- Likes are updated optimistically by patching the server and replacing the toy
  object in state.
- Deleting a toy removes it from both the server and the DOM.

## Screenshot

![Toy Tales completed app](screenshot.png)
