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
- [ ] Invalidate history on new transaction.
- [ ] Handle edit debt in the admin users cards.

## Bugs

- [x] Sometimes the front sends refresh request for no reason (investigate this).
- [x] On initial page load the role isn't set.
- [x] Loading spiner on initial load doesn't exists, we should have initial load to finish the refresh token request.
- [ ] On initial page load the admin isn't set properly (when the user is admin the controls button in the nav doesn't show up).
