**FileUpload** — attach documents (Aadhaar, certificates, photos). Click or drag-and-drop; shows a removable file list with sizes.

```jsx
<FileUpload label="Attachment" accept=".pdf,image/*" multiple
  hint="PDF, JPG or PNG · up to 5 MB" onChange={setFiles} />
```

- Controlled (`files`/`onChange`) or uncontrolled. `multiple` allows several files.
