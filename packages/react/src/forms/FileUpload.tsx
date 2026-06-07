import React from "react";

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export interface FileUploadProps {
  label?: string;
  hint?: string;
  /** Accept attribute, e.g. ".pdf,image/*". */
  accept?: string;
  multiple?: boolean;
  /** Controlled file list. */
  files?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
}

function fmtSize(b: number) {
  if (b < 1024) return b + " B";
  if (b < 1024 * 1024) return (b / 1024).toFixed(0) + " KB";
  return (b / 1024 / 1024).toFixed(1) + " MB";
}

/** UX4G FileUpload — drag-and-drop dropzone with a selected-file list. */
export function FileUpload({ label, hint = "PDF, JPG or PNG · up to 5 MB", accept, multiple = false, files, onChange }: FileUploadProps) {
  const [internal, setInternal] = React.useState<UploadedFile[]>([]);
  const [drag, setDrag] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const list = files ?? internal;
  const update = (next: UploadedFile[]) => { if (files === undefined) setInternal(next); onChange && onChange(next); };
  const add = (fl: FileList | null) => {
    if (!fl) return;
    const mapped = Array.from(fl).map((f) => ({ name: f.name, size: f.size, type: f.type }));
    update(multiple ? [...list, ...mapped] : mapped.slice(0, 1));
  };
  const remove = (i: number) => update(list.filter((_, x) => x !== i));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {label && <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>{label}</span>}
      <div role="button" tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        style={{
          border: `1.5px dashed ${drag ? "var(--color-primary)" : "var(--color-border-strong)"}`,
          borderRadius: "var(--radius-lg)", padding: "26px 20px", textAlign: "center",
          background: drag ? "var(--violet-50)" : "var(--neutral-50)", cursor: "pointer",
          transition: "background var(--duration-fast), border-color var(--duration-fast)",
        }}>
        <span style={{ display: "inline-flex", color: "var(--neutral-500)" }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 13v8" /><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="m8 17 4-4 4 4" /></svg>
        </span>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-text)", marginTop: 8 }}>
          Drag a file here, or <span style={{ color: "var(--color-text-link)", fontWeight: 600 }}>browse</span>
        </div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>{hint}</div>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={(e) => add(e.target.files)} style={{ display: "none" }} />
      </div>
      {list.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {list.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}>
              <span style={{ display: "inline-flex", color: "var(--violet-600)", flex: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 500, color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, color: "var(--color-text-muted)" }}>{fmtSize(f.size)}</div>
              </div>
              <button type="button" aria-label="Remove" onClick={(e) => { e.stopPropagation(); remove(i); }}
                style={{ flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, padding: 0, border: "none", borderRadius: "var(--radius-sm)", background: "transparent", color: "var(--neutral-500)", cursor: "pointer" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
