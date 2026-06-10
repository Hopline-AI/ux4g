Drop official logo PNGs here to replace the placeholders on the e-Visa pages:
  boi-logo.png     — Bureau of Immigration mark
  emblem.png       — State Emblem of India
  evisa-logo.png   — Indian e-Visa mark

LogoSlot renders <img src="/evisa/assets/<name>.png"> and falls back to a
labelled placeholder box if the file is missing, so no code change is needed
once the real files are added.
