# TODO

- [x] Implement login functionality.
- [x] We need to implement a functionality to refresh the tokens right before the token expires.
- [x] Implement signup functionality.
- [x] Implement the home screen.
- [x] Make sure that your application carefully draws screen based on the user Role.
- [x] Forget password page.
- [x] Sort and filter functionality in history page.
- [x] Lazy load the profile image.
- [x] Click on image to change it.
- [x] Set as user functionality doesn't have an endpoint.
- [x] The user card is chopped.
- [x] Invalidate history on new transaction.
- [x] Handle edit debt in the admin users cards.
- [x] Add the verified check mark in the user card.
- [x] Delete last transaction functionality.
- [ ] Last and first page pagination buttons, to go all the way to the end and all the way to the start.
- [ ] Redesign the profile page and make it more functional.
- [ ] Check all the possible invalidations for example when the user name changes the admin users needs to be invalidated, and other invalidations.

## Bugs

- [x] Sometimes the front sends refresh request for no reason (investigate this).
- [x] On initial page load the role isn't set.
- [x] Loading spiner on initial load doesn't exists, we should have initial load to finish the refresh token request.
- [ ] On initial page load the admin isn't set properly (when the user is admin the controls button in the nav doesn't show up).
