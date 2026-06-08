**Comment** — a comment / discussion entry. Avatar (or auto initials), author + time, body, an actions row, and nested replies as children.

```jsx
<Comment
  author="Priya Sharma"
  timestamp="2 hours ago"
  body="The grievance was forwarded to the district office. You should hear back within 7 working days."
  actions={<><a href="#">Reply</a><a href="#">Like</a></>}
>
  <Comment
    author="Help Desk"
    timestamp="1 hour ago"
    highlight
    body="Thanks for the update — reference number GRV-20413 has been noted."
  />
</Comment>
```

- Omit `avatar` to render an initials monogram from `author`; pass an `<Avatar>` for a photo.
- Nest `<Comment>` elements as children for threaded replies (indented with a rail).
- `highlight` tints a new / unread comment.
