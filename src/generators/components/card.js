export function generateComponentCard() {
    return `/* === Component: Card === */
/* Bloc simple pour encadrer du contenu */
.card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 8px 16px rgba(15, 23, 42, 0.08);
}

.card-header {
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.card-footer {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #64748b;
}

`;
}
