export function generateUtilityImage() {
    return `/* === Utility: Image === */
/* Helpers pour conserver les proportions des visuels */
.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Couvre le conteneur sans déformer l'image */
.img-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* S'assure que l'image reste entière */
.img-contain {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

`;
}
