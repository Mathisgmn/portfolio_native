export function generateComponentAlert() {
    return `/* === Component: Alert === */
/* Bandeaux discrets pour signaler un statut */
.alert {
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
}

.alert svg {
  width: 1.25rem;
  height: 1.25rem;
}

.alert-primary {
  background-color: var(--color-primary-light);
  color: #0f172a;
}

.alert-success {
  background-color: var(--color-success-light);
  color: #0f172a;
}

.alert-warning {
  background-color: var(--color-warning-light);
  color: #0f172a;
}

.alert-danger {
  background-color: var(--color-danger-light);
  color: #0f172a;
}

`;
}
